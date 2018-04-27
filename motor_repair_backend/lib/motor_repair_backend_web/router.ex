defmodule MotorRepairBackendWeb.Router do
  use MotorRepairBackendWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :api_auth do
    plug Guardian.Plug.Pipeline, module: MotorRepairBackendWeb.Guardian,
      error_handler: MotorRepairBackendWeb.AuthErrorHandler
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
  end

  scope "/", MotorRepairBackendWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  scope "/api/v1", MotorRepairBackendWeb do
    pipe_through :api
    post "/login", LoginController, :login
    post "/register", LoginController, :register
    get "/plug_auth_failure/:msg", AuthFailureController, :plug_auth_failure
  end

  scope "/api/v1", MotorRepairBackendWeb do
    pipe_through [:api, :api_auth]

    resources "/users", UserController, except: [:new, :edit]
    resources "/projects", ProjectController, except: [:new, :edit]
    resources "/roles", RoleController, except: [:new, :edit]
    resources "/repair_info", RepairInfoController, except: [:new, :edit]

    resources "/carMessage", CarMessageController, except: [:new, :edit]
  end

end
