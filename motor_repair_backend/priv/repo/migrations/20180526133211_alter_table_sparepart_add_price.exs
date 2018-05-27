defmodule MotorRepairBackend.Repo.Migrations.AlterTableSparepartAddPrice do
  use Ecto.Migration

  def change do

    alter table(:spareparts) do
      remove :attributes
      add :price, :float
    end   

    create unique_index(:spareparts, [:name, :specifications, :price], name: :index_unique_spareparts) 

  end
end
