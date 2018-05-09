defmodule MotorRepairBackendWeb.SparepartView do
  use MotorRepairBackendWeb, :view
  alias MotorRepairBackendWeb.SparepartView

  def render("index.json", %{page: page}) do
    %{
      data: render_many(page.entries, SparepartView, "sparepart.json"),
      page_number: page.page_number,
      page_size: page.page_size,
      total_entries: page.total_entries,
      total_pages: page.total_pages
    }
  end

  def render("show.json", %{sparepart: sparepart}) do
    %{data: render_one(sparepart, SparepartView, "sparepart.json")}
  end

  def render("sparepart.json", %{sparepart: sparepart}) do
    sparepart
  end
end
