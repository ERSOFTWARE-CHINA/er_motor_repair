defmodule MotorRepairBackend.ProjectContext.Project do
  use Ecto.Schema
  import Ecto.Changeset

  schema "projects" do
    field :name, :string
    field :province, :string
    field :city, :string
    field :actived, :boolean, default: true
    field :deadline, :date
    field :perms_number, :integer, default: 0

    timestamps()
  end

  @doc false
  def changeset(project, attrs) do
    project
    |> cast(attrs, [:name, :actived, :deadline, :perms_number, :province, :city])
    |> validate_required([:name, :province, :actived])
    |> unique_constraint(:name)
    |> validate_length(:name, min: 4)
  end
end
