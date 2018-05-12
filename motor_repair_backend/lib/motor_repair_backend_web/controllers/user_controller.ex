defmodule MotorRepairBackendWeb.UserController do
  use MotorRepairBackendWeb, :controller
  use MotorRepairBackend.UserContext
  alias MotorRepairBackend.RoleContext.Role

  import MotorRepairBackendWeb.AuthPlugs, only: [project_active: 2, auth_root: 2, auth_admin: 2]

  plug :project_active when action in [:index, :create, :show, :update, :delete]
  plug :auth_admin when action in [:index, :create, :show, :update, :delete]
  plug :auth_root when action in [:assign_to_project] 

  action_fallback MotorRepairBackendWeb.FallbackController

  def index(conn, params) do
    page = page(params, conn)
    render(conn, "index.json", page: page)
  end

  def create(conn, %{"user" => user_params}) do
    user_params = user_params |> disable_is_root
    role_changsets = roles_exists(user_params, conn)
    user_changeset = User.changeset(%User{}, user_params)
    user_changeset = Ecto.Changeset.put_assoc(user_changeset, :roles, role_changsets)
    with {:ok, %User{} = user} <- save_create(user_changeset, conn) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, user} <- get_by_id(User, id, conn, [:roles]) do
      render(conn, "show.json", user: user)
    end
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user_params = user_params |> disable_is_root
    with {:ok, user} <- get_by_id(User, id, conn, [:roles, :project]) do
      role_changsets = roles_exists(user_params, conn)
      user_changeset = User.changeset(user, user_params)
      user_changeset = Ecto.Changeset.put_assoc(user_changeset, :roles, role_changsets)
      with {:ok, %User{} = user} <- save_update(user_changeset, conn) do
        render(conn, "show.json", user: user)
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, %User{} = user} <- delete_by_id(User, id, conn) do
      render(conn, "show.json", user: user)
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

  def check_mobile(conn, %{"mobile" => mobile}) do
    case get_by_name(User, mobile: mobile) do
      nil -> json conn, %{ok: "mobile ok"}
      _ -> json conn, %{error: "mobile error"}
    end
  end

  # 根据参数中的id获取roles，将自动忽略错误的参数
  defp roles_exists(params, conn) do
    roles = params
    |> Map.get("roles", []) 
    |> Enum.filter(fn(r)-> match?(%{"id" => id}, r) end)
    |> Enum.map(fn(r) -> 
      with %{"id" => id} <- r do
        case get_by_id(Role, id, conn) do
          {:error, _} -> nil
          {:ok, role} -> change(Role, role)
        end
      end
    end)
    |> Enum.filter(fn(r)-> !is_nil(r) end)
  end

  # 创建普通用户时，不能指定is_root字段
  defp disable_is_root(user_params) do
    user_params
    |> Map.update("is_root", false, fn(_) -> false end)
  end

end
