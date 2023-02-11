#!/bin/bash
# docker run --name witty-data-todo -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:15.1-alpine
# docker exec -it witty-data-todo psql -U postgres -c "CREATE DATABASE witty-data-todo;"
# create access privileges for the user postgres
# docker exec -it witty-data-todo psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE witty-data-todo TO postgres;"
rm -rf ./backend/node_modules
rm -rf ./frontend/node_modules
rm -rf ./frontend/dist
rm -rf ./backend/dist
rm -rf ./backend/.env
rm -rf ./frontend/.env
rm -rf .env
rm -rf ./frontend/src/lib/axios.js

# All
touch .env
cp ./backend/.env.development .env
echo "NODE_ENV=development" >> .env
echo "FRONTEND_URL=http://localhost:8080" >> .env
echo "FRONTEND_HOST=localhost" >> .env
echo "FRONTEND_PORT=8080" >> .env
echo "BACKEND_URL=http://localhost:3000" >> .env
echo "BACKEND_HOST=localhost" >> .env
echo "BACKEND_PORT=3000" >> .env
echo "PORT=3000" >> .env
echo "DB_HOST=db" >> .env
echo "DATABASE_URL=postgresql://postgres:postgres@db:5432/witty-data-todo" >> .env

# Backend
touch ./backend/.env
cp ./backend/.env.development ./backend/.env
echo "NODE_ENV=development" >> ./backend/.env
echo "FRONTEND_URL=http://localhost:8080" >> ./backend/.env
echo "FRONTEND_HOST=localhost" >> ./backend/.env
echo "FRONTEND_PORT=8080" >> ./backend/.env
echo "BACKEND_URL=http://localhost:3000" >> ./backend/.env
echo "BACKEND_HOST=localhost" >> ./backend/.env
echo "BACKEND_PORT=3000" >> ./backend/.env
echo "PORT=3000" >> ./backend/.env
echo "DB_HOST=db" >> ./backend/.env
echo "DATABASE_URL=postgresql://postgres:postgres@db:5432/witty-data-todo" >> ./backend/.env

# Frontend
touch ./frontend/src/lib/axios.js
echo "export const BACKEND_URL = 'http://localhost:3000';" >> ./frontend/src/lib/axios.js

cd ./backend
nvm use 18
npm install

cd ../frontend
nvm use 18
npm install

docker compose up -d

# Delete the echo frontend

