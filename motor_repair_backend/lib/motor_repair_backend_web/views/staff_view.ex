defmodule MotorRepairBackendWeb.StaffView do
  use MotorRepairBackendWeb, :view
  alias MotorRepairBackendWeb.StaffView

  def render("index.json", %{page: page}) do
    %{data: render_many(page.entries, StaffView, "staff.json"),
      page_number: page.page_number,
      page_size: page.page_size,
      total_entries: page.total_entries,
      total_pages: page.total_pages
  
  }
  end

  def render("show.json", %{staff: staff}) do
    %{data: render_one(staff, StaffView, "staff.json")}
  end

  def render("staff.json", %{staff: staff}) do
    %{id: staff.id,
      staffno: staff.staffno,
      name: staff.name,
      sex: staff.sex,
      idnumber: staff.idnumber,
      mobile: staff.mobile,
      wechat: staff.wechat,
      qqnum: staff.qqnum,
      actived: staff.actived
    }
  end
end
