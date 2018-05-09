defmodule MotorRepairBackendWeb.SparepartController do
  use MotorRepairBackendWeb, :controller

  use MotorRepairBackend.SparepartContext
  alias MotorRepairBackend.SparepartContext.Sparepart

  action_fallback MotorRepairBackendWeb.FallbackController

  def index(conn, params) do
    page = page(params, conn)
    render(conn, "index.json", page: page)
  end

  def create(conn, %{"sparepart" => sparepart_params}) do
    changeset = Sparepart.changeset(%Sparepart{}, sparepart_params)
    with {:ok, %Sparepart{} = sparepart} <- save_create(changeset, conn) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", sparepart_path(conn, :show, sparepart))
      |> render("show.json", sparepart: sparepart)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, sp} <- get_by_id(Sparepart, id, conn) do
      render(conn, "show.json", sparepart: sp)
    end
  end

  def update(conn, %{"id" => id, "sparepart" => sparepart_params}) do
    with {:ok, sp} <- get_by_id(Sparepart, id, conn, [:project]) do
      changeset = Sparepart.changeset(sp, sparepart_params)
      with {:ok, %Sparepart{} = sp} <- save_update(changeset, conn) do
        render(conn, "show.json", sparepart: sp)
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, %Sparepart{} = sp} <- delete_by_id(Sparepart, id, conn) do
      render(conn, "show.json", sparepart: sp)
    end
  end
end
