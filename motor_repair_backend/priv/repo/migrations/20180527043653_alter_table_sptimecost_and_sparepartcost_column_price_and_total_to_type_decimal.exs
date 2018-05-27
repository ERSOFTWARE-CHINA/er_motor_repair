defmodule MotorRepairBackend.Repo.Migrations.AlterTableSptimecostAndSparepartcostColumnPriceAndTotalToTypeDecimal do
  use Ecto.Migration

  def change do
    alter table(:parts_cost) do
      modify :unit_price, :decimal 
      modify :total, :decimal 
    end
    alter table(:time_cost) do
      modify :total, :decimal 
    end
  end
end
