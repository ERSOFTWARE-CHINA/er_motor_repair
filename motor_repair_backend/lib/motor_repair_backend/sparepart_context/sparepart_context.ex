defmodule MotorRepairBackend.SparepartContext do
  @moduledoc """
  The SparepartContext context.
  """

  import Ecto.Query, warn: false
  alias MotorRepairBackend.Repo

  alias MotorRepairBackend.SparepartContext.Sparepart
  use MotorRepairBackend.BaseContext
  
  defmacro __using__(_opts) do
    quote do
      import MotorRepairBackend.SparepartContext
      use MotorRepairBackend.BaseContext
      alias MotorRepairBackend.SparepartContext.Sparepart
    end
  end

  # 参数中存在oneKey的值，则进行多字段"或"查询
  def page(%{"oneKey" => oneKey} = params, conn) do
    Sparepart
    |> query_or_like(oneKey, "name")
    |> query_or_like(oneKey, "specifications")
    |> query_order_by(params, "name")
    |> get_pagination(params, conn)
  end


  def page(params, conn) do
    Sparepart
    |> query_like(params, "name")
    |> query_like(params, "attributes")
    |> query_like(params, "specifications")
    |> query_order_by(params, "name")
    |> get_pagination(params, conn)
  end

end
