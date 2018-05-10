defmodule MotorRepairBackend.UserContext do
  @moduledoc """
  The User context.
  """

  import Ecto.Query, warn: false
  alias MotorRepairBackend.Repo

  alias MotorRepairBackend.UserContext.User
  use MotorRepairBackend.BaseContext

  defmacro __using__(_opts) do
    quote do
      import MotorRepairBackend.UserContext
      use MotorRepairBackend.BaseContext
      alias MotorRepairBackend.UserContext.User
    end
  end

  def page(params, conn) do 
    User
    |> query_like(params, "name")
    |> query_like(params, "mobile")
    |> query_like(params, "real_name")
    |> query_like(params, "position")
    |> query_equal(params, "is_admin")
    |> query_equal(params, "actived")
    |> query_order_by(params, "name")
    |> query_preload(:roles)
    |> get_pagination(params, conn)
  end

  # 异步用户名是否重复
  def check_name_exists(%{"id" => id, "name" => name}) do
    User
    |> Repo.get_by(name: name)
    |> case do
      nil -> {:ok, name}
      proj ->
        case proj.id == id do
          true -> {:ok, name}
          false -> {:error, name}
        end
    end
  end
end
