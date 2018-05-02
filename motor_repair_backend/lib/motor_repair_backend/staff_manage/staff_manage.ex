defmodule MotorRepairBackend.StaffManage do
  @moduledoc """
  The StaffManage context.
  """

  import Ecto.Query, warn: false
  alias MotorRepairBackend.Repo

  alias MotorRepairBackend.StaffManage.Staff
  use MotorRepairBackend.BaseContext

  defmacro __using__(_opts) do
    quote do
      import MotorRepairBackend.StaffManage
      use MotorRepairBackend.BaseContext
      alias MotorRepairBackend.StaffManage.Staff
    end
  end

  def page(params, conn) do 
    Staff
    |> query_like(params, "name")
    |> query_like(params, "staffno")
    |> query_like(params, "sex")
    |> query_like(params, "idnumber")
    |> query_like(params, "mobile")
    |> query_like(params, "wechat")
    |> query_like(params, "qqnum")
    |> query_equal(params, "actived")
    |> query_order_by(params, "name")
    |> get_pagination(params, conn)
  end

  # 异步员工编号是否重复
  def check_staffno_exists(%{"id" => id, "staffno" => staffno}) do
    User
    |> Repo.get_by(staffno: staffno)
    |> case do
      nil -> {:ok, staffno}
      proj ->
        case proj.id == id do
          true -> {:ok, staffno}
          false -> {:error, staffno}
        end
    end
  end
end
