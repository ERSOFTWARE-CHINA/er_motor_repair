defmodule MotorRepairBackend.Repo.Migrations.AlterTableSpareparartsColumnPriceToTypeDecimal do
  use Ecto.Migration

  def change do
    alter table(:spareparts) do
      modify :price, :decimal 
    end
  end
end
