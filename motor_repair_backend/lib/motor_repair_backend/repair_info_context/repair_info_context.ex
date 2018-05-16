defmodule MotorRepairBackend.RepairInfoContext do
  @moduledoc """
  The RepairInfo context.
  """

  import Ecto.Query, warn: false
  alias MotorRepairBackend.Repo

  alias MotorRepairBackend.RepairInfoContext.RepairInfo
  alias MotorRepairBackend.Utils.RunningNo
  alias MotorRepairBackendWeb.Guardian
  use MotorRepairBackend.BaseContext

  defmacro __using__(_opts) do
    quote do
      import MotorRepairBackend.RepairInfoContext
      use MotorRepairBackend.BaseContext
      alias MotorRepairBackend.RepairInfoContext.RepairInfo
      alias MotorRepairBackend.RepairInfoContext.PartsCost
      alias MotorRepairBackend.RepairInfoContext.TimeCost
      alias MotorRepairBackend.CarMessageContext.CarMessage
    end
  end

  def page(params, conn) do 
    RepairInfo
    |> query_like(params, "no")
    |> query_equal(params, "car_message_id")
    |> query_preload([:parts_cost, :time_cost])
    |> get_pagination(params, conn)
  end

  # 获取当前数据库中的流水号（单号的最后3位数字），用于单号自动生成
  def get_current_no(RepairInfo, :no, conn) do
    get_max(RepairInfo, :no, conn)
  end

end
