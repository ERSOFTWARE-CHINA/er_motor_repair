defmodule MotorRepairBackend.GenServer.NoGenerator do
  @moduledoc """
  自动生成维修单号的服务
  """
    
  use GenServer
  alias MotorRepairBackend.RepairInfoContext
  alias MotorRepairBackend.Utils.RunningNo
  alias MotorRepairBackendWeb.Guardian
  alias MotorRepairBackend.RepairInfoContext.RepairInfo

  def start_link do
    GenServer.start_link(__MODULE__, %{}, name: NoGenerator)
  end
  
  def handle_call({:get_no, conn}, _from, state) do
    key = Guardian.Plug.current_resource(conn) |> Map.get(:project_id) |> Integer.to_string
    new_state = state
    state
    |> Map.get(key)
    |> case do
      nil ->
        current_no = RepairInfoContext.get_current_no(RepairInfo, :no, conn)
        next_no = current_no |> RunningNo.get_next_no
        new_state = new_state
        |> Map.put_new(key, next_no)
      {:ok, value} -> 
        IO.puts inspect value
        next_no = value |> RunningNo.get_next_no
        new_state = new_state
        |> Map.update!(key, fn _ -> next_no end)
    end
    {:reply, next_no, new_state}
  end
  
end 