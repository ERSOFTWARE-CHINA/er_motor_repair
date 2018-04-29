defmodule MotorRepairBackend.CarMessageContext do
  @moduledoc """
  The User context.
  """

  import Ecto.Query, warn: false
  alias MotorRepairBackend.Repo

  alias MotorRepairBackend.CarMessageContext.CarMessage
  use MotorRepairBackend.BaseContext

  defmacro __using__(_opts) do
    quote do
      import MotorRepairBackend.CarMessageContext
      use MotorRepairBackend.BaseContext
      alias MotorRepairBackend.CarMessageContext.CarMessage
    end
  end

  # 参数中存在oneKey的值，则进行多字段或查询
  def page(%{"oneKey" => oneKey} = params, conn) do
    CarMessage
    |> query_or_like(oneKey, "owner_name")
    |> query_or_like(oneKey, "phone_num")
    |> query_order_by(params, "owner_name")
    |> get_pagination(params, conn)
    
  end

  def page(params, conn) do
    CarMessage
    |> query_like(params, "owner_name")
    |> query_like(params, "phone_num")
    |> query_like(params, "car_brand")
    |> query_like(params, "car_color")
    |> query_like(params, "engine_num")
    |> query_like(params, "engine_type")
    |> query_like(params, "car_brand")
    |> query_like(params, "buy_date")
    |> query_equal(params, "vin")
    |> query_order_by(params, "owner_name")
    |> get_pagination(params, conn)
  end

  
end
