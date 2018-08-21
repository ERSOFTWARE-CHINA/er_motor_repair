defmodule MotorRepairBackend.RemindingInfoContext do
  @moduledoc """
  The RemindingInfo context.
  """

  import Ecto.Query, warn: false
  alias MotorRepairBackend.Repo

  use MotorRepairBackend.BaseContext
  alias MotorRepairBackend.RemindingInfoContext.RemindingInfo

  defmacro __using__(_opts) do
    quote do
      import MotorRepairBackend.RemindingInfoContext
      use MotorRepairBackend.BaseContext
      alias MotorRepairBackend.RemindingInfoContext.RemindingInfo
    end
  end

  # 查询所有状态为“未提醒”的提醒消息
  def page(%{"reminded" => oneKey} = params, conn) do
    RemindingInfo
    |> query_equal(oneKey, "reminded")
    |> query_order_by(params, "owner_name")
    |> get_pagination(params, conn)
  end

  # 定时执行，生成提醒消息
  def gen_reminding_info() do
    
  end
  
end
