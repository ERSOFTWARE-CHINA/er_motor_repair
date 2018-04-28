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
    info_changeset = RepairInfo.changeset(%RepairInfo{}, repair_info_params)
      |> Ecto.Changeset.put_assoc(:parts_cost, parts_cost_changesets)
    with {:ok, %RepairInfo{} = ri} <- save_create(info_changeset, conn) do
      conn
        |> put_status(:created)
        |> put_resp_header("location", repair_info_path(conn, :show, ri))
        |> render("show.json", repair_info: ri)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, ri} <- get_by_id(RepairInfo, id, conn, [:parts_cost]) do
      render(conn, "show.json", repair_info: ri)
    end
  end

  def update(conn, %{"id" => id, "repair_info" => repair_info_params}) do
    with {:ok, ri} <- get_by_id(RepairInfo, id, conn, [:parts_cost]) do
      parts_cost_changesets = get_parts_cost_changesets(repair_info_params, conn)
      ri_changeset = RepairInfo.changeset(ri, repair_info_params)
        |> Ecto.Changeset.put_assoc(:parts_cost, parts_cost_changesets)
      with {:ok, %RepairInfo{} = ri} <- save_update(ri_changeset, conn) do
        render(conn, "show.json", repair_info: ri)
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, %RepairInfo{} = ri} <- delete_by_id(RepairInfo, id, conn) do
      render(conn, "show.json", repair_info: ri)
    end
  end

  defp get_parts_cost_changesets(params, conn) do
    params
    |> Map.get("parts_cost", [])
    |> Enum.map(fn(d)->
      PartsCost.changeset(%PartsCost{}, d)
    end)
  end
end
