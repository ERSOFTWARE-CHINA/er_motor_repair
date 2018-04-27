defmodule MotorRepairBackend.Repo.Migrations.CreateCarmessage do
  use Ecto.Migration

  def change do
    create table(:car_message) do
      add :car_color, :string
      add :buy_date, :date
      add :car_brand, :string
      add :car_remark, :string
      add :car_series, :string
      add :car_type, :string
      add :engine_num, :string
      add :engine_type, :string
      add :insurance_name, :string
      add :latest_mileage, :string
      add :next_annual_trial_date, :date
      add :next_insurance_date, :date
      add :next_maintain_date, :date
      add :next_maintain_mileage, :string
      add :owner_name, :string
      add :phone_num, :string
      add :plate_num, :string
      add :vin, :string
      add :project_id, references(:projects)
      timestamps()
    end

  end
end
