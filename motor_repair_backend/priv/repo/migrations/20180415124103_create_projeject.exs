defmodule MotorRepairBackend.Repo.Migrations.CreateProjects do
  use Ecto.Migration

  def change do
    create table(:projects) do
      add :name, :string, null: false
      add :perms_number, :integer, null: false
      add :actived, :Boolean, null: false
      add :deadline, :date
      timestamps()
    end
  end
end
