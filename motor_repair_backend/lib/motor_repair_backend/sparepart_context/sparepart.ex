defmodule MotorRepairBackend.SparepartContext.Sparepart do
  use Ecto.Schema
  import Ecto.Changeset
  alias Decimal

  schema "spareparts" do
    field :name, :string
    field :specifications, :string
    field :price, :decimal
    belongs_to :project, MotorRepairBackend.ProjectContext.Project, on_replace: :nilify

    timestamps()
  end

  @doc false
  def changeset(sparepart, attrs) do
    sparepart
    |> cast(attrs, [:name, :specifications, :price])
    |> validate_required([:name, :specifications, :price])
    |> set_price
  end

  # 价格保留两位小数
  defp set_price(changeset) do
    d = Decimal.new(".000")
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{price: price}} ->
        put_change(changeset, :price, Decimal.add(price, d) |> Decimal.round(2))
      _ ->
        changeset
    end
  end
end
