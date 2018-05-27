defmodule MotorRepairBackend.RepairInfoContext.TimeCost do
  use Ecto.Schema
  import Ecto.Changeset

  alias MotorRepairBackend.RepairInfoContext.RepairInfo


  schema "time_cost" do
    field :name, :string                  # 项目名称
    field :total, :decimal                  # 项目总价

    belongs_to :repair_info, RepairInfo, on_replace: :delete

    timestamps()
  end

  @doc false
  def changeset(time_cost, attrs) do
    time_cost
    |> cast(attrs, [:name, :total])
    |> validate_required([:name, :total])
    |> set_price
  end

  # 价格保留两位小数
  defp set_price(changeset) do
    d = Decimal.new(".000")
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{total: total}} ->
        put_change(changeset, :total, Decimal.add(total, d) |> Decimal.round(2))
      _ ->
        changeset
    end
  end
end