defmodule MotorRepairBackend.Repo.Migrations.CreateSpareparts do
  use Ecto.Migration

  def change do
    create table(:spareparts) do
      add :name, :string
      add :attributes, :string
      add :specifications, :string
      add :project_id, references(:projects)
      timestamps()
    end

    create unique_index(:spareparts, [:name, :specifications], name: :index_name_specifications)

  end
end
