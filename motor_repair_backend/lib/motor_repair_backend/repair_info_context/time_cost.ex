defmodule MotorRepairBackend.RepairInfoContext.TimeCost do
  use Ecto.Schema
  import Ecto.Changeset

  alias MotorRepairBackend.RepairInfoContext.RepairInfo


  schema "time_cost" do
    field :name, :string                  # 项目名称
    field :total, :float                  # 项目总价

    belongs_to :repair_info, RepairInfo, on_replace: :delete

    timestamps()
  end

  @doc false
  def changeset(time_cost, attrs) do
    time_cost
    |> cast(attrs, [:name, :total])
    |> validate_required([:name, :total])
  end
end