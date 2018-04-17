defmodule MotorRepairBackendWeb.RoleController do
  use MotorRepairBackendWeb, :controller
  use MotorRepairBackend.RoleContext
  import MotorRepairBackendWeb.Permissions, only: [get_number_from_perms: 1, need_perms: 1, get_all_permissions: 0, get_max_perms_number: 0, get_perms_from_number: 1]
  alias Guardian.Permissions.Bitwise
  alias MotorRepairBackend.ProjectContext.Project
  alias MotorRepairBackend.Repo

  import MotorRepairBackendWeb.AuthPlugs, only: [project_active: 2, auth_admin: 2]

  plug :project_active
  plug :auth_admin

  # plug Bitwise,  need_perms([:write_role]) when action in [:update, :delete, :create]
  # plug Bitwise,  need_perms([:read_role]) when action in [:index, :show]

  action_fallback MotorRepairBackendWeb.FallbackController

  def index(conn, params) do
    page = page(params, conn)
    render(conn, "index.json", page: page)
  end

  def create(conn, %{"role" => role_params}) do
    with {:ok, %Role{} = role} <- save_create(Role.changeset(%Role{}, role_params|>convert_perms_to_number), conn) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", role_path(conn, :show, role))
      |> render("show.json", role: role)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, role} <- get_by_id(Role, id, conn) do
      role = role |> Map.update(:perms_number,%{default: []}, fn(v)-> get_perms_from_number(%{default: v}) end)
      render(conn, "show.json", role: role)
    end
  end

  def update(conn, %{"id" => id, "role" => role_params}) do
    with {:ok, role} <- get_by_id(Role, id, conn, [:project]) do
      with {:ok, %Role{} = role} <- save_update(Role.changeset(role, role_params|>convert_perms_to_number), conn) do
        render(conn, "show.json", role: role)
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, %Role{} = role} <- delete_by_id(Role, id, conn) do
      render(conn, "show.json", role: role)
    end
  end

  # 任何用户获取的“所有权限”，都限与其所属项目的权限
  def list_all_perms(conn, _) do
    
    claims = MotorRepairBackendWeb.Guardian.Plug.current_claims(conn)
    proj_id = claims |> Map.get("project", -1)
    claims 
    |> Map.get("is_root", false)
    |> case do
      true ->
        json conn, get_all_permissions
      false ->
        Project
        |> Repo.get(proj_id)
        |> case do
          nil -> json conn, %{ default: [] }
          proj -> 
            json conn, %{ default: proj.perms_number } |> get_perms_from_number
        end
    end
  end

  defp convert_perms_to_number(params) do
    %{default: perms_number} = %{ default: params
    |> Map.get("perms", []) }
    |> get_number_from_perms

    params = params
    |> Map.update("perms_number", perms_number, fn(v) -> perms_number end)

    params
  end

end
