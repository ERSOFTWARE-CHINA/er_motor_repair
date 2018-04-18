defmodule MotorRepairBackend.Repo.Migrations.CreateRoles do
  use Ecto.Migration

  def change do
    create table(:roles) do
      add :name, :string, null: false  
      add :perms_number, :integer, null: false
      add :project_id, references(:projects)
      timestamps()
    end

    create unique_index(:roles, [:name])

    create table(:users_roles, primary_key: false) do
      add :user_id, references(:users, on_delete: :delete_all)
      add :role_id, references(:roles, on_delete: :delete_all)
    end

  end
end
