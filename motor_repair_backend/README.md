# MotorRepairBackend

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

## 使用docker启动

  * sudo docker-compose up -d web
  * sudo docker-compose run web mix deps.get
  * sudo docker-compose run web mix ecto.create
  * sudo docker-compose run web mix ecto.migrate
  * sudo docker-compose restart web
  * sudo docker-compose logs -f web
