#/bin/bash

docker run --name er_motor_repair \
-e POSTGRES_PASSWORD=postgres \
-e POSTGRES_USER=postgres \
-e POSTGRES_DB=motor_repair_dev \
-p 5432:5432 \
-d postgres
