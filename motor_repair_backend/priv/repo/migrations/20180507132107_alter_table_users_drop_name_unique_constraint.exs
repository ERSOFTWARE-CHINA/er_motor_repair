defmodule MotorRepairBackend.Repo.Migrations.AlterTableUsersDropNameUniqueConstraint do
  use Ecto.Migration

  def change do
    drop unique_index(:users, [:name])
  end
end
