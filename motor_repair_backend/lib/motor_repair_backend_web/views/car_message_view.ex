defmodule MotorRepairBackendWeb.CarMessageView do
  use MotorRepairBackendWeb, :view
  alias MotorRepairBackendWeb.CarMessageView

  def render("index.json", %{page: page}) do
    %{
      data: render_many(page.entries, CarMessageView, "car_message.json"),
      page_number: page.page_number,
      page_size: page.page_size,
      total_entries: page.total_entries,
      total_pages: page.total_pages
    }
  end

  def render("show.json", %{car_message: car_message}) do
    %{data: render_one(car_message, CarMessageView, "car_message.json")}
  end


  def render("car_message.json", %{car_message: car_message}) do
    %{
       id: car_message.id,
       owner_name: car_message.owner_name,
       phone_num: car_message.phone_num,

       plate_num: car_message.plate_num,
       car_brand: car_message.car_brand,
       car_color: car_message.car_color,
       vin: car_message.vin,
       car_type: car_message.car_type,
       car_series: car_message.car_series,

       engine_num: car_message.engine_num,
       engine_type: car_message.engine_type,
       buy_date: car_message.buy_date,
       next_maintain_date: car_message.next_maintain_date,
       next_maintain_mileage: car_message.next_maintain_mileage,
       next_annual_trial_date: car_message.next_annual_trial_date,
       next_insurance_date: car_message.next_insurance_date,
       insurance_name: car_message.insurance_name,
       latest_mileage: car_message.latest_mileage,
       car_remark: car_message.car_remark
     }
  end
end
