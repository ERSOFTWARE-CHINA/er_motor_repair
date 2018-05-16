defmodule MotorRepairBackend.Repo.Migrations.CraeteTableCostTimeBelongsToRepairInfo do
  use Ecto.Migration

  def change do
    create table(:time_cost) do
      add :name, :string                  # 项目名称
      add :total, :float                  # 项目总价
      add :repair_info_id, references(:repair_info)
      timestamps()
    end
  end
end
