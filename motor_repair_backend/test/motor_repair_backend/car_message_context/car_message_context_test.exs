defmodule MotorRepairBackend.CarMessageContextTest do
  use MotorRepairBackend.DataCase

  alias MotorRepairBackend.CarMessageContext

  describe "carmessage" do
    alias MotorRepairBackend.CarMessageContext.CarMessage

    @valid_attrs %{CarColor: "some CarColor", buyDate: "some buyDate", carBrand: "some carBrand", carRemark: "some carRemark", carSeries: "some carSeries", carType: "some carType", date: "some date", engineNum: "some engineNum", engineType: "some engineType", insuranceName: "some insuranceName", latestMileage: "some latestMileage", nextAnnualTrialDate: "some nextAnnualTrialDate", nextInsuranceDate: "some nextInsuranceDate", nextMaintainDate: "some nextMaintainDate", nextMaintainMileage: "some nextMaintainMileage", ownerName: "some ownerName", phoneNum: "some phoneNum", plateNum: "some plateNum", string: "some string", vin: "some vin"}
    @update_attrs %{CarColor: "some updated CarColor", buyDate: "some updated buyDate", carBrand: "some updated carBrand", carRemark: "some updated carRemark", carSeries: "some updated carSeries", carType: "some updated carType", date: "some updated date", engineNum: "some updated engineNum", engineType: "some updated engineType", insuranceName: "some updated insuranceName", latestMileage: "some updated latestMileage", nextAnnualTrialDate: "some updated nextAnnualTrialDate", nextInsuranceDate: "some updated nextInsuranceDate", nextMaintainDate: "some updated nextMaintainDate", nextMaintainMileage: "some updated nextMaintainMileage", ownerName: "some updated ownerName", phoneNum: "some updated phoneNum", plateNum: "some updated plateNum", string: "some updated string", vin: "some updated vin"}
    @invalid_attrs %{CarColor: nil, buyDate: nil, carBrand: nil, carRemark: nil, carSeries: nil, carType: nil, date: nil, engineNum: nil, engineType: nil, insuranceName: nil, latestMileage: nil, nextAnnualTrialDate: nil, nextInsuranceDate: nil, nextMaintainDate: nil, nextMaintainMileage: nil, ownerName: nil, phoneNum: nil, plateNum: nil, string: nil, vin: nil}

    def car_message_fixture(attrs \\ %{}) do
      {:ok, car_message} =
        attrs
        |> Enum.into(@valid_attrs)
        |> CarMessageContext.create_car_message()

      car_message
    end

    test "list_carmessage/0 returns all carmessage" do
      car_message = car_message_fixture()
      assert CarMessageContext.list_carmessage() == [car_message]
    end

    test "get_car_message!/1 returns the car_message with given id" do
      car_message = car_message_fixture()
      assert CarMessageContext.get_car_message!(car_message.id) == car_message
    end

    test "create_car_message/1 with valid data creates a car_message" do
      assert {:ok, %CarMessage{} = car_message} = CarMessageContext.create_car_message(@valid_attrs)
      assert car_message.CarColor == "some CarColor"
      assert car_message.buyDate == "some buyDate"
      assert car_message.carBrand == "some carBrand"
      assert car_message.carRemark == "some carRemark"
      assert car_message.carSeries == "some carSeries"
      assert car_message.carType == "some carType"
      assert car_message.date == "some date"
      assert car_message.engineNum == "some engineNum"
      assert car_message.engineType == "some engineType"
      assert car_message.insuranceName == "some insuranceName"
      assert car_message.latestMileage == "some latestMileage"
      assert car_message.nextAnnualTrialDate == "some nextAnnualTrialDate"
      assert car_message.nextInsuranceDate == "some nextInsuranceDate"
      assert car_message.nextMaintainDate == "some nextMaintainDate"
      assert car_message.nextMaintainMileage == "some nextMaintainMileage"
      assert car_message.ownerName == "some ownerName"
      assert car_message.phoneNum == "some phoneNum"
      assert car_message.plateNum == "some plateNum"
      assert car_message.string == "some string"
      assert car_message.vin == "some vin"
    end

    test "create_car_message/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = CarMessageContext.create_car_message(@invalid_attrs)
    end

    test "update_car_message/2 with valid data updates the car_message" do
      car_message = car_message_fixture()
      assert {:ok, car_message} = CarMessageContext.update_car_message(car_message, @update_attrs)
      assert %CarMessage{} = car_message
      assert car_message.CarColor == "some updated CarColor"
      assert car_message.buyDate == "some updated buyDate"
      assert car_message.carBrand == "some updated carBrand"
      assert car_message.carRemark == "some updated carRemark"
      assert car_message.carSeries == "some updated carSeries"
      assert car_message.carType == "some updated carType"
      assert car_message.date == "some updated date"
      assert car_message.engineNum == "some updated engineNum"
      assert car_message.engineType == "some updated engineType"
      assert car_message.insuranceName == "some updated insuranceName"
      assert car_message.latestMileage == "some updated latestMileage"
      assert car_message.nextAnnualTrialDate == "some updated nextAnnualTrialDate"
      assert car_message.nextInsuranceDate == "some updated nextInsuranceDate"
      assert car_message.nextMaintainDate == "some updated nextMaintainDate"
      assert car_message.nextMaintainMileage == "some updated nextMaintainMileage"
      assert car_message.ownerName == "some updated ownerName"
      assert car_message.phoneNum == "some updated phoneNum"
      assert car_message.plateNum == "some updated plateNum"
      assert car_message.string == "some updated string"
      assert car_message.vin == "some updated vin"
    end

    test "update_car_message/2 with invalid data returns error changeset" do
      car_message = car_message_fixture()
      assert {:error, %Ecto.Changeset{}} = CarMessageContext.update_car_message(car_message, @invalid_attrs)
      assert car_message == CarMessageContext.get_car_message!(car_message.id)
    end

    test "delete_car_message/1 deletes the car_message" do
      car_message = car_message_fixture()
      assert {:ok, %CarMessage{}} = CarMessageContext.delete_car_message(car_message)
      assert_raise Ecto.NoResultsError, fn -> CarMessageContext.get_car_message!(car_message.id) end
    end

    test "change_car_message/1 returns a car_message changeset" do
      car_message = car_message_fixture()
      assert %Ecto.Changeset{} = CarMessageContext.change_car_message(car_message)
    end
  end
end
