defmodule MotorRepairBackend.RepairInfoContext do
  @moduledoc """
  The RepairInfo context.
  """

  import Ecto.Query, warn: false
  alias MotorRepairBackend.Repo

  alias MotorRepairBackend.RepairInfoContext.RepairInfo
  use MotorRepairBackend.BaseContext

  defmacro __using__(_opts) do
    quote do
      import MotorRepairBackend.RepairInfoContext
      use MotorRepairBackend.BaseContext
      alias MotorRepairBackend.RepairInfoContext.RepairInfo
      alias MotorRepairBackend.RepairInfoContext.PartsCost
      alias MotorRepairBackend.CarMessageContext.CarMessage
    end
  end

  def page(params, conn) do 
    RepairInfo
      |> query_like(params, "no")
      |> query_equal(params, "car_message_id")
      |> query_preload(:parts_cost)
      |> get_pagination(params, conn)
  end
end
