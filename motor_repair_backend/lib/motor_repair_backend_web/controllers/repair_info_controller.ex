defmodule MotorRepairBackendWeb.RepairInfoController do
  use MotorRepairBackendWeb, :controller

  use MotorRepairBackend.RepairInfoContext

  action_fallback MotorRepairBackendWeb.FallbackController

  def index(conn, params) do
    page = page(params, conn)
    render(conn, "index.json", page: page)
  end

  def create(conn, %{"repair_info" => repair_info_params}) do
    parts_cost_changesets = get_parts_cost_changesets(repair_info_params, conn)
    time_cost_changesets = get_time_cost_changesets(repair_info_params, conn)
    car_message_changeset = get_car_message_changeset(repair_info_params, conn)
    info_changeset = RepairInfo.changeset(%RepairInfo{}, repair_info_params)
    |> Ecto.Changeset.put_assoc(:parts_cost, parts_cost_changesets)
    |> Ecto.Changeset.put_assoc(:time_cost, time_cost_changesets)
    |> Ecto.Changeset.put_assoc(:car_message, car_message_changeset)
    with {:ok, %RepairInfo{} = ri} <- save_create(info_changeset, conn) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", repair_info_path(conn, :show, ri))
      |> render("show.json", repair_info: ri)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, ri} <- get_by_id(RepairInfo, id, conn, [:parts_cost, :time_cost]) do
      render(conn, "show.json", repair_info: ri)
    end
  end

  def update(conn, %{"id" => id, "repair_info" => repair_info_params}) do
    with {:ok, ri} <- get_by_id(RepairInfo, id, conn, [:parts_cost, :time_cost, :project]) do
      parts_cost_changesets = get_parts_cost_changesets(repair_info_params, conn)
      time_cost_changesets = get_time_cost_changesets(repair_info_params, conn)
      ri_changeset = RepairInfo.changeset(ri, repair_info_params)
      |> Ecto.Changeset.put_assoc(:parts_cost, parts_cost_changesets)
      |> Ecto.Changeset.put_assoc(:time_cost, time_cost_changesets)
      with {:ok, %RepairInfo{} = ri} <- save_update(ri_changeset, conn) do
        render(conn, "show.json", repair_info: ri)
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, %RepairInfo{} = ri} <- delete_by_id(RepairInfo, id, conn, [:time_cost, :parts_cost]) do
      render(conn, "show.json", repair_info: ri)
    end
  end

  # 自动生成单号
  def get_next_no(conn, _) do
    case GenServer.call(NoGenerator, {:get_no,conn}) do
      {:ok, value} -> json conn, %{ok: value}
      {_, error} -> json conn, %{error: error}
    end
  end

  defp get_parts_cost_changesets(params, conn) do
    params
    |> Map.get("parts_cost", [])
    |> Enum.map(fn(d)->
      PartsCost.changeset(%PartsCost{}, d)
    end)
  end

  defp get_time_cost_changesets(params, conn) do
    params
    |> Map.get("time_cost", [])
    |> Enum.map(fn(d)->
      TimeCost.changeset(%TimeCost{}, d)
    end)
  end

  defp get_car_message_changeset(params, conn) do
    params
    |> Map.get("car_message", %{})
    |> Map.get("id")
    |> case do
      nil -> nil
      id ->
        case get_by_id(CarMessage, id, conn) do
          {:error, _} -> nil
          {:ok, car_message} -> change(CarMessage, car_message)
        end
    end
  end
end
