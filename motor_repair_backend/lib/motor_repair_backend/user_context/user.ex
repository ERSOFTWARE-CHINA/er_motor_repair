defmodule MotorRepairBackend.UserContext.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :name, :string
    field :mobile, :string
    field :password, :string, virtual: true
    # 默认密码"admin123"
    field :password_hash, :string, default: "$pbkdf2-sha512$160000$.0mu4IBJ8tD5cckQhz9tqQ$Iv05hJ49w8WqovfrVUfind8YFt.lrQpj2TNxVuSDXJ0FZHX2YMSl0l8M.FtqYoGdiZDvcTDUp/5xe4/RgkS7FQ"
    field :real_name, :string
    field :position, :string
    field :is_admin, :boolean, default: false
    field :is_root, :boolean, default: false
    field :actived, :boolean, default: true
    field :perms_number, :integer, default: 0
    # field :avatar, RestfulApiWeb.Avatar.Type

    many_to_many :roles, MotorRepairBackend.RoleContext.Role, join_through: "users_roles", on_replace: :delete
    belongs_to :project, MotorRepairBackend.ProjectContext.Project, on_replace: :nilify

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
      |> cast(attrs, [:name, :mobile, :password, :real_name, :position, :is_admin, :is_root, :actived])
      # |> cast_attachments(attrs, [:avatar])
      |> validate_required([:name])
      |> validate_format(:mobile, ~r/^1\d{10}$/)
      |> unique_constraint(:mobile)
      |> validate_length(:name, min: 2)
      |> validate_length(:password, min: 6)
      |> put_password_hash()
  end

  defp put_password_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        put_change(changeset, :password_hash, Comeonin.Pbkdf2.hashpwsalt(password))
      _ ->
        changeset
    end
  end
end
