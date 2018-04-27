defmodule MotorRepairBackend.CarMessageContext.CarMessage do
  use Ecto.Schema
  import Ecto.Changeset


  schema "car_message" do
    field :owner_name, :string
    field :phone_num, :string

    field :plate_num, :string
    field :car_brand, :string
    field :car_color, :string
    field :vin, :string
    field :car_type, :string
    field :car_series, :string

    field :engine_num, :string
    field :engine_type, :string
    field :buy_date, :date
    field :next_maintain_date, :date
    field :next_maintain_mileage, :string
    field :next_annual_trial_date, :date
    field :next_insurance_date, :date
    field :insurance_name, :string
    field :latest_mileage, :string
    field :car_remark, :string

    belongs_to :project, MotorRepairBackend.ProjectContext.Project, on_replace: :nilify
    timestamps()
  end

  @doc false
  def changeset(car_message, attrs) do
    car_message
    |> cast(attrs, [:owner_name, :phone_num, :plate_num, :car_brand,:car_color,
                    :vin, :car_type, :car_series,:engine_num, :engine_type, :buy_date, :next_maintain_date,
                    :next_maintain_mileage, :next_annual_trial_date, :next_insurance_date,:insurance_name, :latest_mileage, :car_remark])
    |> validate_required([:owner_name, :phone_num, :plate_num])
  end
end
