defmodule MotorRepairBackendWeb.CORS do
  use Corsica.Router,
    origins: ["http://localhost:4200"],
    allow_headers: ["content-type", "application/json", "Authorization"],
    allow_credentials: true,
    max_age: 600

    resource "/*", origins: "*"
end