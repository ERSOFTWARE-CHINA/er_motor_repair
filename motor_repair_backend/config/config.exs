# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :motor_repair_backend,
  ecto_repos: [MotorRepairBackend.Repo]

# Configures the endpoint
config :motor_repair_backend, MotorRepairBackendWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "TzO/25Si0vRRH5jFxLNg/KoYVcg4n7MOXVoRbRkuubiNSPkAUmT97KQwzde1iILK",
  render_errors: [view: MotorRepairBackendWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: MotorRepairBackend.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

config :motor_repair_backend, MotorRepairBackendWeb.Guardian,
  issuer: "motor_repair_backend",
  secret_key: "j0/ssJf0441VW/25glbSth1H85SFj7PfmbRGpeH+AbXmmHkGDtmuTnw3HXu+kJxz",
  ttl: {180, :day}

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
