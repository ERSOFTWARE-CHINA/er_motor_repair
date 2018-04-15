defmodule MotorRepairBackend.UserService.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "user" do
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
