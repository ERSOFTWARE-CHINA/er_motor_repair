defmodule MotorRepairBackend.CarMessageContext do
  @moduledoc """
  The User context.
  """

  import Ecto.Query, warn: false
  alias MotorRepairBackend.Repo

  alias MotorRepairBackend.CarMessageContext.CarMessage
  alias MotorRepairBackend.Utils.GetDate
  use MotorRepairBackend.BaseContext
  alias MotorRepairBackend.RepairInfoContext.RepairInfo
  import Ecto.Query.API, only: [fragment: 1]
  use Timex
  import Ecto.Query.API, only: [like: 2, field: 2, type: 2]

  defmacro __using__(_opts) do
    quote do
      import MotorRepairBackend.CarMessageContext
      use MotorRepairBackend.BaseContext
      alias MotorRepairBackend.CarMessageContext.CarMessage
    end
  end

  # 参数中存在oneKey的值，则进行多字段"或"查询
  def page(%{"oneKey" => oneKey} = params, conn) do
    CarMessage
    |> query_or_like(oneKey, "owner_name")
    |> query_or_like(oneKey, "phone_num")
    |> query_or_like(oneKey, "plate_num")
    |> query_order_by(params, "owner_name")
    |> get_pagination(params, conn)
    
  end

  def page(params, conn) do
    # query_reminder(params, conn)
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

  def query_reminder(params, conn) do
    claims = MotorRepairBackendWeb.Guardian.Plug.current_claims(conn)
    project_id = claims |> Map.get("project")
    # 未进场天数
    time_difference = params |> Map.get("time_difference", "0") |> String.to_integer
    time = Timex.today
    begin_time = Date.add(time, -5 - time_difference)
    end_time = Date.add(time, 5 - time_difference)
    qry = "SELECT c.owner_name, c.phone_num, MAX(r.entry_date) last_time
           FROM car_message AS c 
           JOIN repair_info as r on c.id = r.car_message_id 
           WHERE c.project_id = $1
           GROUP BY c.id
           HAVING MAX(r.entry_date) > $2::date
           AND MAX(r.entry_date) < $3::date;"
    res = Ecto.Adapters.SQL.query!(Repo, qry, [project_id, Date.to_erl(begin_time), Date.to_erl(end_time)])
    res.rows
    |> Enum.map(fn(r)-> 
      [a, b, c] = r
      {:ok, d} = c |> Date.from_erl
      %{owner_name: a, phone_num: b, last_date: d} end)
  end

end
