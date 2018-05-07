defmodule MotorRepairBackend.Utils.RunningNo do
  @moduledoc """
  流水号为11位数字组成的字符串，前8位为日期，后3位为顺序号
  例如：20180506001
  """

  alias MotorRepairBackend.Utils.GetDate

  # 获取当天最小流水号单号
  def get_min_no() do
    GetDate.get_date_str <> "001"
  end

  # 获取下个流水号
  def get_next_no(currentNo) do
    if is_nil(currentNo) do
      currentNo = "00000000000"
    end
    date_no_str = currentNo
    |> String.slice(0..7)
    serial_no_str = currentNo
    |> String.slice(8..10)
    today_no_str = GetDate.get_date_str

    case { date_no_str > today_no_str, date_no_str == today_no_str && serial_no_str == "999" } do
      {true, _} -> {:error, "date_str is invalid."}
      {_, true} -> {:error, "serial_no is overflow."}
      {false, false} -> 
        
        if date_no_str < today_no_str do
          current_serial_no = 0
        else 
          current_serial_no = serial_no_str
          |> String.to_integer
        end
        
        next_serial_no_str = current_serial_no + 1
        |> Integer.to_string
        IO.puts next_serial_no_str
        case String.length(next_serial_no_str) do
          1 -> {:ok, today_no_str <> "00" <> next_serial_no_str}
          2 -> {:ok, today_no_str <> "0" <> next_serial_no_str}
          3 -> {:ok, today_no_str <> next_serial_no_str}
          _ -> {:error, "serial_no is invalid."}
        end
    end
  end

  
end