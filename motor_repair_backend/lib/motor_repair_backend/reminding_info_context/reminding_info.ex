defmodule MotorRepairBackend.RemindingInfoContext.RemindingInfo do
  use Ecto.Schema
  import Ecto.Changeset

  alias MotorRepairBackend.ProjectContext.Project

  schema "reminding_info" do
    field :owner_name, :string
    field :phone_num, :string
    field :info_content, :string
    field :reminded, :boolean, default: false 

    belongs_to :project, Project, on_replace: :nilify
    timestamps()
  end

  @doc false
  def changeset(reminding_info, attrs) do
    reminding_info
    |> cast(attrs, [:owner_name, :phone_num, :info_content])
    |> validate_required([:owner_name, :phone_num, :info_content, :status])
  end

end
