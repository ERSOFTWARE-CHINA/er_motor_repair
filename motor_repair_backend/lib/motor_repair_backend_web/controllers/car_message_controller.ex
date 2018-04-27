defmodule MotorRepairBackendWeb.CarMessageController do
  use MotorRepairBackendWeb, :controller
  use MotorRepairBackend.CarMessageContext

  # import MotorRepairBackendWeb.AuthPlugs, only: [project_active: 2, auth_root: 2, auth_admin: 2]
  import MotorRepairBackendWeb.Permissions

  # plug :auth_root

  action_fallback MotorRepairBackendWeb.FallbackController

  def index(conn, params) do
    page = page(params, conn)
    render(conn, "index.json", page: page)
  end

  def create(conn, %{"car_message" => car_message_params}) do
    with {:ok, %CarMessage{} = car_message} <- save_create(CarMessage.changeset(%CarMessage{}, car_message_params|>convert_perms_to_number), conn) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", car_message_path(conn, :show, car_message))
      |> render("show.json", car_message: car_message)
    end
  end
  def create(conn, %{"car_message" => car_message_params}) do
    with {:ok, %CarMessage{} = car_message} <- save_create(CarMessage.changeset(%CarMessage{}, car_message_params|>convert_perms_to_number), conn) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", car_message_path(conn, :show, car_message))
      |> render("show.json", car_message: car_message)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, car_message} <- get_by_id(CarMessage, id, conn) do
      # 获取权限列表
      proj = car_message |> Map.update(:perms_number,%{default: []}, fn(v)-> get_perms_from_number(%{default: v}) end)
      render(conn, "show.json", car_message: proj)
    end
  end

  def update(conn, %{"id" => id, "car_message" => car_message_params}) do
    with {:ok, car_message} <- get_by_id(CarMessage, id, conn, [:project]) do
      with {:ok, %CarMessage{} = car_message} <- save_update(CarMessage.changeset(car_message, car_message_params|>convert_perms_to_number), conn) do
        render(conn, "show.json", car_message: car_message)
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, %CarMessage{} = car_message} <- delete_by_id(CarMessage, id, conn) do
      render(conn, "show.json", car_message: car_message)
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
