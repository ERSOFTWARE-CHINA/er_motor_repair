defmodule MotorRepairBackend.AuthFailureController do
  use MotorRepairBackendWeb, :controller
  import MotorRepairBackendWeb.TranslateMsg

  def plug_auth_failure(conn, %{"msg" => msg}) do
    json conn , %{error: ~t/#{msg}/}
  end
end