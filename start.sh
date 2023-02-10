#!/bin/bash
# docker run --name witty-data-todo -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:15.1-alpine
# docker exec -it witty-data-todo psql -U postgres -c "CREATE DATABASE witty-data-todo;"
# create access privileges for the user postgres
# docker exec -it witty-data-todo psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE witty-data-todo TO postgres;"
docker compose up db -d