defmodule MotorRepairBackend.Repo.Migrations.AlterTableProjectAddColumnResourceCounter do
  use Ecto.Migration

  def change do
    alter table(:projects) do
      add :resource_counter, :integer
    end  
  end
end
