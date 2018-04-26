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
  end
end
