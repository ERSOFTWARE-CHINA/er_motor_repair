defmodule MotorRepairBackendWeb.RoleView do
  use MotorRepairBackendWeb, :view
  alias MotorRepairBackendWeb.RoleView

  def render("index.json", %{page: page}) do
    %{
      data: render_many(page.entries, RoleView, "role.json"),
      page_number: page.page_number,
      page_size: page.page_size,
      total_entries: page.total_entries,
      total_pages: page.total_pages
    }
  end

  def render("show.json", %{role: role}) do
    %{data: render_one(role, RoleView, "role.json")}
  end

  def render("role.json", %{role: role}) do
    %{id: role.id,
      name: role.name,
      perms_number: role.perms_number
    }
  end
end
