defmodule MotorRepairBackendWeb.RepairInfoView do
  use MotorRepairBackendWeb, :view
  alias MotorRepairBackendWeb.RepairInfoView

  def render("index.json", %{page: page}) do
    %{
      data: render_many(page.entries, RepairInfoView, "repair_info.json"),
      page_number: page.page_number,
      page_size: page.page_size,
      total_entries: page.total_entries,
      total_pages: page.total_pages
    }
  end

  def render("show.json", %{repair_info: repair_info}) do
    %{data: render_one(repair_info, RepairInfoView, "repair_info.json")}
  end

  def render("repair_info.json", %{repair_info: repair_info}) do
    repair_info
    |> add_price_to_repair_info
  end

  # 维修单需要工时价格总计和配件价格总计以及总计三个字段
  defp add_price_to_repair_info(repair_info) do
    time_cost = 
    case repair_info.time_cost do
      [] -> 0
      list -> 
        list
        |> Enum.reduce(0, fn(r,acc) -> r.total + acc end)
    end
    parts_cost = 
    case repair_info.parts_cost do
      [] -> 0
      list -> 
        list
        |> Enum.reduce(0, fn(r,acc) -> r.total + acc end)
    end
    repair_info
    |> Map.put_new(:time_total, time_cost)
    |> Map.put_new(:parts_total, parts_cost)
    |> Map.put_new(:total, time_cost + parts_cost)
  end
end
