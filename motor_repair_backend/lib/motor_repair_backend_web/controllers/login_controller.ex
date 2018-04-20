defmodule MotorRepairBackendWeb.LoginController do
    
  use MotorRepairBackendWeb, :controller   
  alias MotorRepairBackendWeb.{Guardian, Permissions}
  use Ecto.Schema

  alias MotorRepairBackend.UserContext.User
  alias MotorRepairBackend.ProjectContext.Project
  alias MotorRepairBackend.Repo
  import Ecto.Query, only: [where: 3, order_by: 3, preload: 3]
  import MotorRepairBackend.BaseContext, only: [save_create: 2]
  import MotorRepairBackendWeb.Utils.TranslateChangesetError, only: [translate_changeset_error: 1]

  def register(conn, %{"user" => user_params}) do
    project_changeset = get_project_changeset(user_params)
    user_changeset = get_user_changeset(user_params)
      |> Ecto.Changeset.put_assoc(:project, project_changeset)
      |> Repo.insert
      |> case do
        {:ok, user} -> json conn, user
        {:error, changeset} -> 
          json conn, translate_changeset_error(changeset)
    end
  end

  defp get_user_changeset(user_params) do
    user_params = user_params 
      |> Map.update("is_admin", true, fn(_) -> true end)
      |> Map.update("is_root", false, fn(_) -> false end)
    User.changeset(%User{}, user_params)
  end

  defp get_project_changeset(user_params) do
    project_params = Map.get(user_params, "project", %{})
    pm = %{
      name: Map.get(project_params, "name")
    }
    Project.changeset(%Project{}, pm)
  end
      
  def login(conn, %{"password" => pw, "username" => un, "project" => proj} = params) do
    case checkPassword(un, pw, proj) do
      {:ok, user, project_id} ->
        # 将权限和项目id编码进token
        perms_number = Permissions.get_perms_from_roles(user.roles)
        {:ok, token, claims} = Guardian.encode_and_sign(user, %{pem: %{"default" => perms_number}, project: project_id, is_root: user.is_root})
        perms = Permissions.get_permissions(claims)
        json conn, %{user: get_user_map(user), jwt: token, perms: perms}
      {:error, _} ->
        conn
        |> put_status(200)
        |> json(%{error: "Invalid username or password!"})
    end
  end

  defp checkPassword(username, password, project) do
    Project
    |> Repo.get_by(name: project)
    |> case do
      nil -> {:error, nil}
      project -> 
        user = User
        |> preload([e], [:roles])
        |> Repo.get_by(%{ name: username, project_id: project.id })
        cond do
          # 用户存在，且不为root，但用户未激活
          !is_nil(user) && !user.is_root && !user.actived ->
            {:error, nil}
          # 用户存在，且不为root，但项目已禁用
          !is_nil(user) && !user.is_root && !project.actived ->
            {:error, nil}
          # 用户存在，且密码正确
          !is_nil(user) && Comeonin.Pbkdf2.checkpw(password, user.password_hash) ->
            {:ok, user, project.id}
          true ->
            {:error, nil}
        end
    end
    
  end

  defp get_user_map(user) do
    case user do
      nil -> nil
      user ->
        %{
          id: user.id,
          name: user.name,
          email: user.email,
          real_name: user.real_name,
          position: user.position,
          is_admin: user.is_admin,
          is_root: user.is_root,
          actived: user.actived,
          perms_number: user.perms_number,
        }
    end
  end

end