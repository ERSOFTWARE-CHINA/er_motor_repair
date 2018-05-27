defmodule MotorRepairBackend.RepairInfoContext.PartsCost do
  use Ecto.Schema
  import Ecto.Changeset

  alias MotorRepairBackend.RepairInfoContext.RepairInfo


  schema "parts_cost" do
    field :name, :string                  # 配件名称
    field :amount, :integer               # 配件数量
    field :unit_price, :decimal           # 单价
    field :total, :decimal                # 总价

    belongs_to :repair_info, RepairInfo, on_replace: :delete

    timestamps()
  end

  @doc false
  def changeset(parts_cost, attrs) do
    parts_cost
    |> cast(attrs, [:name, :amount, :unit_price, :total])
    |> validate_required([:name, :amount, :unit_price, :total])
    |> set_price
  end

  # 价格保留两位小数
  defp set_price(changeset) do
    d = Decimal.new(".000")
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{unit_price: unit_price, total: total}} ->
        changeset
        |> put_change(:unit_price, Decimal.add(unit_price, d) |> Decimal.round(2))
        |> put_change(:total, Decimal.add(total, d) |> Decimal.round(2))
      _ ->
        changeset
    end
  end
end
