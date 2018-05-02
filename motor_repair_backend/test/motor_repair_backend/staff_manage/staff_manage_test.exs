defmodule MotorRepairBackend.StaffManageTest do
  use MotorRepairBackend.DataCase

  alias MotorRepairBackend.StaffManage

  describe "staffs" do
    alias MotorRepairBackend.StaffManage.Staff

    @valid_attrs %{name: "some name"}
    @update_attrs %{name: "some updated name"}
    @invalid_attrs %{name: nil}

    def staff_fixture(attrs \\ %{}) do
      {:ok, staff} =
        attrs
        |> Enum.into(@valid_attrs)
        |> StaffManage.create_staff()

      staff
    end

    test "list_staffs/0 returns all staffs" do
      staff = staff_fixture()
      assert StaffManage.list_staffs() == [staff]
    end

    test "get_staff!/1 returns the staff with given id" do
      staff = staff_fixture()
      assert StaffManage.get_staff!(staff.id) == staff
    end

    test "create_staff/1 with valid data creates a staff" do
      assert {:ok, %Staff{} = staff} = StaffManage.create_staff(@valid_attrs)
      assert staff.name == "some name"
    end

    test "create_staff/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = StaffManage.create_staff(@invalid_attrs)
    end

    test "update_staff/2 with valid data updates the staff" do
      staff = staff_fixture()
      assert {:ok, staff} = StaffManage.update_staff(staff, @update_attrs)
      assert %Staff{} = staff
      assert staff.name == "some updated name"
    end

    test "update_staff/2 with invalid data returns error changeset" do
      staff = staff_fixture()
      assert {:error, %Ecto.Changeset{}} = StaffManage.update_staff(staff, @invalid_attrs)
      assert staff == StaffManage.get_staff!(staff.id)
    end

    test "delete_staff/1 deletes the staff" do
      staff = staff_fixture()
      assert {:ok, %Staff{}} = StaffManage.delete_staff(staff)
      assert_raise Ecto.NoResultsError, fn -> StaffManage.get_staff!(staff.id) end
    end

    test "change_staff/1 returns a staff changeset" do
      staff = staff_fixture()
      assert %Ecto.Changeset{} = StaffManage.change_staff(staff)
    end
  end
end
