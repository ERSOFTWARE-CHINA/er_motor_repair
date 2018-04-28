defmodule MotorRepairBackend.RepairInfoContext.PartsCost do
  use Ecto.Schema
  import Ecto.Changeset

  alias MotorRepairBackend.RepairInfoContext.RepairInfo


  schema "parts_cost" do
    field :name, :string                  # 配件名称
    field :amount, :integer               # 配件数量
    field :unit_price, :float             # 单价
    field :total, :float                  # 总价

    belongs_to :repair_info, RepairInfo, on_replace: :delete

    timestamps()
  end

  @doc false
  def changeset(parts_cost, attrs) do
    parts_cost
    |> cast(attrs, [:name, :amount, :unit_price, :total])
    |> validate_required([:name, :amount, :unit_price, :total])
  end
end
