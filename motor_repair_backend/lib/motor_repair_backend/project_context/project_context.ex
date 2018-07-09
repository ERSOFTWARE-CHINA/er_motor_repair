defmodule MotorRepairBackend.ProjectContext do
  @moduledoc """
  The ProjectContext.
  """

  import Ecto.Query, warn: false
  use MotorRepairBackend.BaseContext
  alias MotorRepairBackend.ProjectContext.Project
  alias MotorRepairBackend.RoleContext.Role
  alias MotorRepairBackendWeb.Guardian
  use Bitwise

  defmacro __using__(_opts) do
    quote do
      import MotorRepairBackend.ProjectContext
      use MotorRepairBackend.BaseContext
      alias MotorRepairBackend.ProjectContext.Project
    end
  end

  def page(params, conn) do
    Project
    |> query_like(params, "name")
    |> query_equal(params, "actived")
    |> query_order_by(params, "name")
    |> get_pagination(params, conn)
  end

  # 查询当前项目的配件接口使用次数，查询后，如果为使用接口(带参数)则使用次数加1
  def get_resource_counter(conn,params) do
    resource = Guardian.Plug.current_resource(conn)
    project = Repo.get(Project, resource.project_id)
    case Map.get(params, "is_use") do
      "false" -> nil
      "true" ->
        param = %{resource_counter: project.resource_counter + 1}
        Project.changeset(project, param)
        |>Repo.update
    end
    project.resource_counter
  end

  # 每天晚上刷新接口使用次数,每天12点调用
  def flush_count() do
    qry = "UPDATE projects SET resource_counter=0"
    res = Ecto.Adapters.SQL.query!(Repo, qry, []) 
    IO.puts inspect res
  end

  def check_name_exists(%{"id" => id, "name" => name}) do
    Project
    |> Repo.get_by(name: name)
    |> case do
      nil -> {:ok, name}
      proj ->
        case proj.id == id do
          true -> {:ok, name}
          false -> {:error, name}
        end
    end
  end

  # 更新项目后，如果回收项目权限，该项目下所有的角色权限分配需要统一回收
  def update_project_with_handle_perms(project, changeset, conn) do
    new_perms_number = changeset.changes
      |> Map.get(:perms_number, 0)
    old_perms_number = project
      |> Map.get(:perms_number, 0)

    case old_perms_number == (old_perms_number &&& new_perms_number) do
      true -> # 权限扩大，不需要回收权限
        save_update(changeset, conn)
      false -> # 权限变更，且需要回收权限：每一个role的权限和新的权限做一个与操作，这里需要事务控制
        roles = get_roles_by_project(project)
        roles_changesets = roles
        |> Enum.map(fn(r) -> Role.changeset(r, %{"perms_number" => r.perms_number &&& new_perms_number}) end) 
        Repo.transaction(fn -> 
          roles_changesets
          |> Enum.map(fn(r) -> Repo.update(r) end)
          save_update(changeset, conn)
        end)
    end 
  end

  # 获取项目下的所有role
  defp get_roles_by_project(project) do
    roles = Role
    |> query_equal(%{"project_id" => project.id}, "project_id")
    |> Repo.all
  end
end
