defmodule MotorRepairBackend.Repo.Migrations.AlterRepairInfoAddColumnAddressssAndPhone do
  use Ecto.Migration

  def change do
    alter table(:projects) do
      add :address, :string
      add :tel, :string
    end  
  end
end
