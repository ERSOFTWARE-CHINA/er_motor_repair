defmodule MotorRepairBackend.Repo.Migrations.AlterRepairInfoAddColumnPayType do
  use Ecto.Migration

  def change do
    alter table(:repair_info) do
      add :pay_type, :string
    end  
  end
end
