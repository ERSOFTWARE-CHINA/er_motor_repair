defmodule MotorRepairBackend.Repo.Migrations.AlterUsersRenameEmailToMobile do
  use Ecto.Migration

  def change do
    rename table("users"), :email, to: :mobile
  end
end
