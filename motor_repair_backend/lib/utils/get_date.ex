defmodule MotorRepairBackend.Utils.GetDate do

  use Timex

  def get_now() do
    Timex.now
  end

  # https://hexdocs.pm/timex/formatting.html#content
  def get_date_str() do
    Timex.now
    |> Timex.format!("%Y%m%d", :strftime)
  end

end