defmodule MotorRepairBackendWeb.UserController do
  use MotorRepairBackendWeb, :controller

  alias MotorRepairBackend.UserService
  alias MotorRepairBackend.UserService.User

  action_fallback MotorRepairBackendWeb.FallbackController

  def index(conn, _params) do
    user = UserService.list_user()
    render(conn, "index.json", user: user)
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- UserService.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    user = UserService.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = UserService.get_user!(id)

    with {:ok, %User{} = user} <- UserService.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = UserService.get_user!(id)
    with {:ok, %User{}} <- UserService.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
