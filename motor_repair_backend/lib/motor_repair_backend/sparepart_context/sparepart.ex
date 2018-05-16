defmodule MotorRepairBackend.SparepartContext.Sparepart do
  use Ecto.Schema
  import Ecto.Changeset


  schema "spareparts" do
    field :name, :string
    field :attributes, :string
    field :specifications, :string
    belongs_to :project, MotorRepairBackend.ProjectContext.Project, on_replace: :nilify

    timestamps()
  end

  @doc false
  def changeset(sparepart, attrs) do
    sparepart
    |> cast(attrs, [:name, :attributes, :specifications])
    |> validate_required([:name])
  end
end
