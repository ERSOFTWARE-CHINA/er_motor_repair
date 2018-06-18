defmodule MotorRepairBackendWeb.RepairInfoView do
  use MotorRepairBackendWeb, :view
  alias MotorRepairBackendWeb.RepairInfoView
  alias Decimal
  alias Elixlsx.{Workbook, Sheet}

  # 维修结算单表头
  @header [
    "ID"
  ]

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

  # 生成维修结算单excel文件
  def render("report_repair_info_bill.xlsx", %{repair_info: repair_info, car_message: car_message}) do
    report_generator(car_message, repair_info) 
    |> Elixlsx.write_to_memory("report_repair_info_bill.xlsx") 
    |> elem(1) 
    |> elem(1)
  end

  defp report_generator(car_message, repair_info) do
    sheet1 = Sheet.with_name("维修结算单")
    |> Sheet.set_cell("A2", "客户姓名：")
    |> Sheet.set_cell("B2", car_message.owner_name)
    |> Sheet.set_cell("C2", "车牌号：")
    |> Sheet.set_cell("D2", car_message.plate_num)
    |> write_details(3, repair_info.parts_cost)
    %Workbook{sheets: [sheet1]}
  end

  defp write_details(sheet, start_line_no, details) do
    details
    |> Enum.with_index(start_line_no)
    |> Enum.reduce(sheet, fn({detail, index}, acc)-> 
      acc
      |> Sheet.set_cell("A#{index}", detail.name)
      |> Sheet.set_cell("B#{index}", detail.amount)
    end)

  end

  # 维修单需要工时价格总计和配件价格总计以及总计三个字段
  defp add_price_to_repair_info(repair_info) do
    acc = Decimal.new(".00")
    d = Decimal.new(".0000")
    time_cost = 
    case repair_info.time_cost do
      [] -> acc
      list -> 
        list
        |> Enum.reduce(Decimal.new(".00"), fn(r,acc) -> Decimal.add(r.total, acc) |> Decimal.add(d) |> Decimal.round(2) end)
    end
    parts_cost = 
    case repair_info.parts_cost do
      [] -> acc
      list -> 
        list
        |> Enum.reduce(Decimal.new(".00"), fn(r,acc) -> Decimal.add(r.total, acc) |> Decimal.add(d) |> Decimal.round(2) end)
    end
    repair_info
    |> Map.put_new(:time_total, time_cost)
    |> Map.put_new(:parts_total, parts_cost)
    |> Map.put_new(:total, Decimal.add(time_cost, parts_cost) |> Decimal.add(d) |> Decimal.round(2))
  end
end
