defmodule MotorRepairBackend.Repo.Migrations.AlterRepairInfoAddStatus do
  use Ecto.Migration

  def change do
    alter table("repair_info") do
      add :status, :boolean 
    end
  end
end
