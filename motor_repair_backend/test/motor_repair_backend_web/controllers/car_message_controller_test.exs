defmodule MotorRepairBackendWeb.CarMessageControllerTest do
  use MotorRepairBackendWeb.ConnCase

  alias MotorRepairBackend.CarMessageContext
  alias MotorRepairBackend.CarMessageContext.CarMessage

  @create_attrs %{CarColor: "some CarColor", buyDate: "some buyDate", carBrand: "some carBrand", carRemark: "some carRemark", carSeries: "some carSeries", carType: "some carType", date: "some date", engineNum: "some engineNum", engineType: "some engineType", insuranceName: "some insuranceName", latestMileage: "some latestMileage", nextAnnualTrialDate: "some nextAnnualTrialDate", nextInsuranceDate: "some nextInsuranceDate", nextMaintainDate: "some nextMaintainDate", nextMaintainMileage: "some nextMaintainMileage", ownerName: "some ownerName", phoneNum: "some phoneNum", plateNum: "some plateNum", string: "some string", vin: "some vin"}
  @update_attrs %{CarColor: "some updated CarColor", buyDate: "some updated buyDate", carBrand: "some updated carBrand", carRemark: "some updated carRemark", carSeries: "some updated carSeries", carType: "some updated carType", date: "some updated date", engineNum: "some updated engineNum", engineType: "some updated engineType", insuranceName: "some updated insuranceName", latestMileage: "some updated latestMileage", nextAnnualTrialDate: "some updated nextAnnualTrialDate", nextInsuranceDate: "some updated nextInsuranceDate", nextMaintainDate: "some updated nextMaintainDate", nextMaintainMileage: "some updated nextMaintainMileage", ownerName: "some updated ownerName", phoneNum: "some updated phoneNum", plateNum: "some updated plateNum", string: "some updated string", vin: "some updated vin"}
  @invalid_attrs %{CarColor: nil, buyDate: nil, carBrand: nil, carRemark: nil, carSeries: nil, carType: nil, date: nil, engineNum: nil, engineType: nil, insuranceName: nil, latestMileage: nil, nextAnnualTrialDate: nil, nextInsuranceDate: nil, nextMaintainDate: nil, nextMaintainMileage: nil, ownerName: nil, phoneNum: nil, plateNum: nil, string: nil, vin: nil}

  def fixture(:car_message) do
    {:ok, car_message} = CarMessageContext.create_car_message(@create_attrs)
    car_message
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all carmessage", %{conn: conn} do
      conn = get conn, car_message_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create car_message" do
    test "renders car_message when data is valid", %{conn: conn} do
      conn = post conn, car_message_path(conn, :create), car_message: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, car_message_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "CarColor" => "some CarColor",
        "buyDate" => "some buyDate",
        "carBrand" => "some carBrand",
        "carRemark" => "some carRemark",
        "carSeries" => "some carSeries",
        "carType" => "some carType",
        "date" => "some date",
        "engineNum" => "some engineNum",
        "engineType" => "some engineType",
        "insuranceName" => "some insuranceName",
        "latestMileage" => "some latestMileage",
        "nextAnnualTrialDate" => "some nextAnnualTrialDate",
        "nextInsuranceDate" => "some nextInsuranceDate",
        "nextMaintainDate" => "some nextMaintainDate",
        "nextMaintainMileage" => "some nextMaintainMileage",
        "ownerName" => "some ownerName",
        "phoneNum" => "some phoneNum",
        "plateNum" => "some plateNum",
        "string" => "some string",
        "vin" => "some vin"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, car_message_path(conn, :create), car_message: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update car_message" do
    setup [:create_car_message]

    test "renders car_message when data is valid", %{conn: conn, car_message: %CarMessage{id: id} = car_message} do
      conn = put conn, car_message_path(conn, :update, car_message), car_message: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, car_message_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "CarColor" => "some updated CarColor",
        "buyDate" => "some updated buyDate",
        "carBrand" => "some updated carBrand",
        "carRemark" => "some updated carRemark",
        "carSeries" => "some updated carSeries",
        "carType" => "some updated carType",
        "date" => "some updated date",
        "engineNum" => "some updated engineNum",
        "engineType" => "some updated engineType",
        "insuranceName" => "some updated insuranceName",
        "latestMileage" => "some updated latestMileage",
        "nextAnnualTrialDate" => "some updated nextAnnualTrialDate",
        "nextInsuranceDate" => "some updated nextInsuranceDate",
        "nextMaintainDate" => "some updated nextMaintainDate",
        "nextMaintainMileage" => "some updated nextMaintainMileage",
        "ownerName" => "some updated ownerName",
        "phoneNum" => "some updated phoneNum",
        "plateNum" => "some updated plateNum",
        "string" => "some updated string",
        "vin" => "some updated vin"}
    end

    test "renders errors when data is invalid", %{conn: conn, car_message: car_message} do
      conn = put conn, car_message_path(conn, :update, car_message), car_message: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete car_message" do
    setup [:create_car_message]

    test "deletes chosen car_message", %{conn: conn, car_message: car_message} do
      conn = delete conn, car_message_path(conn, :delete, car_message)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, car_message_path(conn, :show, car_message)
      end
    end
  end

  defp create_car_message(_) do
    car_message = fixture(:car_message)
    {:ok, car_message: car_message}
  end
end
