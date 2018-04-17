defmodule MotorRepairBackendWeb.RoleControllerTest do
  use MotorRepairBackendWeb.ConnCase

  alias MotorRepairBackend.RoleService
  alias MotorRepairBackend.RoleService.Role

  @create_attrs %{name: "some name"}
  @update_attrs %{name: "some updated name"}
  @invalid_attrs %{name: nil}

  def fixture(:role) do
    {:ok, role} = RoleService.create_role(@create_attrs)
    role
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all role", %{conn: conn} do
      conn = get conn, role_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create role" do
    test "renders role when data is valid", %{conn: conn} do
      conn = post conn, role_path(conn, :create), role: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, role_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "name" => "some name"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, role_path(conn, :create), role: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update role" do
    setup [:create_role]

    test "renders role when data is valid", %{conn: conn, role: %Role{id: id} = role} do
      conn = put conn, role_path(conn, :update, role), role: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, role_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "name" => "some updated name"}
    end

    test "renders errors when data is invalid", %{conn: conn, role: role} do
      conn = put conn, role_path(conn, :update, role), role: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete role" do
    setup [:create_role]

    test "deletes chosen role", %{conn: conn, role: role} do
      conn = delete conn, role_path(conn, :delete, role)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, role_path(conn, :show, role)
      end
    end
  end

  defp create_role(_) do
    role = fixture(:role)
    {:ok, role: role}
  end
end
