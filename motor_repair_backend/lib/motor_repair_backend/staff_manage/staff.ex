defmodule MotorRepairBackend.StaffManage.Staff do
  use Ecto.Schema
  import Ecto.Changeset


  schema "staffs" do
    field :staffno, :string
    field :name, :string
    field :sex, :boolean, default: true
    field :idnumber, :string
    field :mobile, :string
    field :wechat, :string
    field :qqnum, :string
    field :actived, :boolean, default: true
    belongs_to :project, MotorRepairBackend.ProjectContext.Project, on_replace: :nilify
    timestamps()
  end

  @doc false
  def changeset(staff, attrs) do
    staff
    |> cast(attrs, [:name, :staffno, :sex, :idnumber, :mobile, :wechat, :qqnum, :actived])
    |> validate_required([:name])
  end
end
