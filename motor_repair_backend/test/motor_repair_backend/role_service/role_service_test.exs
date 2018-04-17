defmodule MotorRepairBackend.RoleServiceTest do
  use MotorRepairBackend.DataCase

  alias MotorRepairBackend.RoleService

  describe "role" do
    alias MotorRepairBackend.RoleService.Role

    @valid_attrs %{name: "some name"}
    @update_attrs %{name: "some updated name"}
    @invalid_attrs %{name: nil}

    def role_fixture(attrs \\ %{}) do
      {:ok, role} =
        attrs
        |> Enum.into(@valid_attrs)
        |> RoleService.create_role()

      role
    end

    test "list_role/0 returns all role" do
      role = role_fixture()
      assert RoleService.list_role() == [role]
    end

    test "get_role!/1 returns the role with given id" do
      role = role_fixture()
      assert RoleService.get_role!(role.id) == role
    end

    test "create_role/1 with valid data creates a role" do
      assert {:ok, %Role{} = role} = RoleService.create_role(@valid_attrs)
      assert role.name == "some name"
    end

    test "create_role/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = RoleService.create_role(@invalid_attrs)
    end

    test "update_role/2 with valid data updates the role" do
      role = role_fixture()
      assert {:ok, role} = RoleService.update_role(role, @update_attrs)
      assert %Role{} = role
      assert role.name == "some updated name"
    end

    test "update_role/2 with invalid data returns error changeset" do
      role = role_fixture()
      assert {:error, %Ecto.Changeset{}} = RoleService.update_role(role, @invalid_attrs)
      assert role == RoleService.get_role!(role.id)
    end

    test "delete_role/1 deletes the role" do
      role = role_fixture()
      assert {:ok, %Role{}} = RoleService.delete_role(role)
      assert_raise Ecto.NoResultsError, fn -> RoleService.get_role!(role.id) end
    end

    test "change_role/1 returns a role changeset" do
      role = role_fixture()
      assert %Ecto.Changeset{} = RoleService.change_role(role)
    end
  end
end
