defmodule MotorRepairBackend.Repo.Migrations.AlterRepairInfoAddBelongsToCarMessage do
  use Ecto.Migration

  def change do
    alter table(:repair_info) do
      add :car_message_id, references(:car_message)
    end    
  end
end
