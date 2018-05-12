defmodule MotorRepairBackendWeb.ProjectController do
  use MotorRepairBackendWeb, :controller
  use MotorRepairBackend.ProjectContext

  import MotorRepairBackendWeb.AuthPlugs, only: [auth_root: 2]
  import MotorRepairBackendWeb.Permissions

  plug :auth_root when action in [:index, :create, :show, :update, :delete]

  action_fallback MotorRepairBackendWeb.FallbackController

  def index(conn, params) do
    page = page(params, conn)
    render(conn, "index.json", page: page)
  end

  def create(conn, %{"project" => project_params}) do
    with {:ok, %Project{} = project} <- save_create(Project.changeset(%Project{}, project_params|>convert_perms_to_number), conn) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", project_path(conn, :show, project))
      |> render("show.json", project: project)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, project} <- get_by_id(Project, id, conn) do
      # 获取权限列表
      proj = project |> Map.update(:perms_number,%{default: []}, fn(v)-> get_perms_from_number(%{default: v}) end)
      render(conn, "show.json", project: proj)
    end
  end

  def update(conn, %{"id" => id, "project" => project_params}) do
    with {:ok, project} <- get_by_id(Project, id, conn) do
      with {:ok, %Project{} = proj} <- save_update(Project.changeset(project, project_params|>convert_perms_to_number), conn) do
        IO.puts inspect update_project_with_handle_perms(project, Project.changeset(project, project_params|>convert_perms_to_number), conn)
        render(conn, "show.json", project: proj)
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, %Project{} = project} <- delete_by_id(Project, id, conn) do
      render(conn, "show.json", project: project)
    end
  end

  # get请求中的参数为字符串类型，这里需要将id转换微integer类型，因此前台需传送数字，否则报错
  def check_name(conn, %{"id"=> id,"name" => name}) do
    case check_name_exists(%{"id"=> String.to_integer(id),"name" => name}) do
      {:ok, _} -> json conn, %{ok: "name ok"}
      {:error, _} -> 
        json conn, %{error: "name error"}
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
