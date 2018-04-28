defmodule MotorRepairBackend.RepairInfoContextTest do
  use MotorRepairBackend.DataCase

  alias MotorRepairBackend.RepairInfoContext

  describe "repairinfo" do
    alias MotorRepairBackend.RepairInfoContext.RepairInfo

    @valid_attrs %{no: "some no"}
    @update_attrs %{no: "some updated no"}
    @invalid_attrs %{no: nil}

    def repair_info_fixture(attrs \\ %{}) do
      {:ok, repair_info} =
        attrs
        |> Enum.into(@valid_attrs)
        |> RepairInfoContext.create_repair_info()

      repair_info
    end

    test "list_repairinfo/0 returns all repairinfo" do
      repair_info = repair_info_fixture()
      assert RepairInfoContext.list_repairinfo() == [repair_info]
    end

    test "get_repair_info!/1 returns the repair_info with given id" do
      repair_info = repair_info_fixture()
      assert RepairInfoContext.get_repair_info!(repair_info.id) == repair_info
    end

    test "create_repair_info/1 with valid data creates a repair_info" do
      assert {:ok, %RepairInfo{} = repair_info} = RepairInfoContext.create_repair_info(@valid_attrs)
      assert repair_info.no == "some no"
    end

    test "create_repair_info/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = RepairInfoContext.create_repair_info(@invalid_attrs)
    end

    test "update_repair_info/2 with valid data updates the repair_info" do
      repair_info = repair_info_fixture()
      assert {:ok, repair_info} = RepairInfoContext.update_repair_info(repair_info, @update_attrs)
      assert %RepairInfo{} = repair_info
      assert repair_info.no == "some updated no"
    end

    test "update_repair_info/2 with invalid data returns error changeset" do
      repair_info = repair_info_fixture()
      assert {:error, %Ecto.Changeset{}} = RepairInfoContext.update_repair_info(repair_info, @invalid_attrs)
      assert repair_info == RepairInfoContext.get_repair_info!(repair_info.id)
    end

    test "delete_repair_info/1 deletes the repair_info" do
      repair_info = repair_info_fixture()
      assert {:ok, %RepairInfo{}} = RepairInfoContext.delete_repair_info(repair_info)
      assert_raise Ecto.NoResultsError, fn -> RepairInfoContext.get_repair_info!(repair_info.id) end
    end

    test "change_repair_info/1 returns a repair_info changeset" do
      repair_info = repair_info_fixture()
      assert %Ecto.Changeset{} = RepairInfoContext.change_repair_info(repair_info)
    end
  end
end
