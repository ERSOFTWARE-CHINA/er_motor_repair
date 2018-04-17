defmodule MotorRepairBackend.RoleContext do
  @moduledoc """
  The Role Context.
  """

  import Ecto.Query, warn: false
  alias MotorRepairBackend.Repo

  alias MotorRepairBackend.RoleContext.Role
  use MotorRepairBackend.BaseContext

  defmacro __using__(_opts) do
    quote do
      import MotorRepairBackend.RoleContext
      use MotorRepairBackend.BaseContext
      alias MotorRepairBackend.RoleContext.Role
    end
  end

  def page(params, conn) do 
    Role
    |> query_like(params, "name")
    |> query_order_by(params, "name")
    |> get_pagination(params, conn)
  end
end
