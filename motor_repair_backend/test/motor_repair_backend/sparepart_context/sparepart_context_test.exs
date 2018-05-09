defmodule MotorRepairBackend.SparepartContextTest do
  use MotorRepairBackend.DataCase

  alias MotorRepairBackend.SparepartContext

  describe "spareparts" do
    alias MotorRepairBackend.SparepartContext.Sparepart

    @valid_attrs %{name: "some name"}
    @update_attrs %{name: "some updated name"}
    @invalid_attrs %{name: nil}

    def sparepart_fixture(attrs \\ %{}) do
      {:ok, sparepart} =
        attrs
        |> Enum.into(@valid_attrs)
        |> SparepartContext.create_sparepart()

      sparepart
    end

    test "list_spareparts/0 returns all spareparts" do
      sparepart = sparepart_fixture()
      assert SparepartContext.list_spareparts() == [sparepart]
    end

    test "get_sparepart!/1 returns the sparepart with given id" do
      sparepart = sparepart_fixture()
      assert SparepartContext.get_sparepart!(sparepart.id) == sparepart
    end

    test "create_sparepart/1 with valid data creates a sparepart" do
      assert {:ok, %Sparepart{} = sparepart} = SparepartContext.create_sparepart(@valid_attrs)
      assert sparepart.name == "some name"
    end

    test "create_sparepart/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = SparepartContext.create_sparepart(@invalid_attrs)
    end

    test "update_sparepart/2 with valid data updates the sparepart" do
      sparepart = sparepart_fixture()
      assert {:ok, sparepart} = SparepartContext.update_sparepart(sparepart, @update_attrs)
      assert %Sparepart{} = sparepart
      assert sparepart.name == "some updated name"
    end

    test "update_sparepart/2 with invalid data returns error changeset" do
      sparepart = sparepart_fixture()
      assert {:error, %Ecto.Changeset{}} = SparepartContext.update_sparepart(sparepart, @invalid_attrs)
      assert sparepart == SparepartContext.get_sparepart!(sparepart.id)
    end

    test "delete_sparepart/1 deletes the sparepart" do
      sparepart = sparepart_fixture()
      assert {:ok, %Sparepart{}} = SparepartContext.delete_sparepart(sparepart)
      assert_raise Ecto.NoResultsError, fn -> SparepartContext.get_sparepart!(sparepart.id) end
    end

    test "change_sparepart/1 returns a sparepart changeset" do
      sparepart = sparepart_fixture()
      assert %Ecto.Changeset{} = SparepartContext.change_sparepart(sparepart)
    end
  end
end
