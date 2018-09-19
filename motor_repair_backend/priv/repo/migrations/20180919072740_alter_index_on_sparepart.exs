defmodule MotorRepairBackend.Repo.Migrations.AlterIndexOnSparepart do
  use Ecto.Migration

  def change do

    drop unique_index(:repair_info, [:no])
    # drop unique_index(:users, [:name])
    drop unique_index(:users, [:email])
    drop unique_index(:spareparts, [:name, :specifications], name: :index_name_specifications)
    drop unique_index(:spareparts, [:name, :specifications, :price], name: :index_unique_spareparts) 


    create unique_index(:repair_info, [:no, :project_id])
    create unique_index(:users, [:name, :project_id])
    # create unique_index(:users, [:email, :project_id])
    create unique_index(:spareparts, [:name, :specifications, :project_id], name: :index_name_specifications)
    create unique_index(:spareparts, [:name, :specifications, :price, :project_id], name: :index_unique_spareparts) 
  end
end
