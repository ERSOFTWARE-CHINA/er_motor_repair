defmodule MotorRepairBackendWeb.RepairInfoControllerTest do
  use MotorRepairBackendWeb.ConnCase

  alias MotorRepairBackend.RepairInfoContext
  alias MotorRepairBackend.RepairInfoContext.RepairInfo

  @create_attrs %{no: "some no"}
  @update_attrs %{no: "some updated no"}
  @invalid_attrs %{no: nil}

  def fixture(:repair_info) do
    {:ok, repair_info} = RepairInfoContext.create_repair_info(@create_attrs)
    repair_info
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all repairinfo", %{conn: conn} do
      conn = get conn, repair_info_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create repair_info" do
    test "renders repair_info when data is valid", %{conn: conn} do
      conn = post conn, repair_info_path(conn, :create), repair_info: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, repair_info_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "no" => "some no"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, repair_info_path(conn, :create), repair_info: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update repair_info" do
    setup [:create_repair_info]

    test "renders repair_info when data is valid", %{conn: conn, repair_info: %RepairInfo{id: id} = repair_info} do
      conn = put conn, repair_info_path(conn, :update, repair_info), repair_info: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, repair_info_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "no" => "some updated no"}
    end

    test "renders errors when data is invalid", %{conn: conn, repair_info: repair_info} do
      conn = put conn, repair_info_path(conn, :update, repair_info), repair_info: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete repair_info" do
    setup [:create_repair_info]

    test "deletes chosen repair_info", %{conn: conn, repair_info: repair_info} do
      conn = delete conn, repair_info_path(conn, :delete, repair_info)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, repair_info_path(conn, :show, repair_info)
      end
    end
  end

  defp create_repair_info(_) do
    repair_info = fixture(:repair_info)
    {:ok, repair_info: repair_info}
  end
end
