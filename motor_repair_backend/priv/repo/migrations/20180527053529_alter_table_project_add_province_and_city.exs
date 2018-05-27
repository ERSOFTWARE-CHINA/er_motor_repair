defmodule MotorRepairBackend.Repo.Migrations.AlterTableProjectAddProvinceAndCity do
  use Ecto.Migration

  def change do
    alter table(:projects) do
      add :province, :string
      add :city, :string
    end  
  end
end
