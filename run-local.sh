rm -rf ./backend/node_modules
rm -rf ./frontend/node_modules
rm -rf ./frontend/dist
rm -rf ./backend/dist
rm -rf ./backend/.env
rm -rf ./frontend/.env
rm -rf .env
rm -rf ./frontend/src/lib/axios.js
rm -rf ./backend/uploads

mkdir ./backend/uploads
touch ./backend/.env
cp ./backend/.env.development ./backend/.env

echo "NODE_ENV=development" >> ./backend/.env
echo "FRONTEND_URL=http://localhost:3000" >> ./backend/.env
echo "FRONTEND_HOST=localhost" >> ./backend/.env
echo "FRONTEND_PORT=3000" >> ./backend/.env
echo "BACKEND_URL=http://localhost:4000" >> ./backend/.env
echo "BACKEND_HOST=localhost" >> ./backend/.env
echo "BACKEND_PORT=4000" >> ./backend/.env
echo "PORT=4000" >> ./backend/.env
echo "DB_HOST=localhost" >> ./backend/.env
echo "DATABASE_URL=postgresql://postgres:postgres@localhost:5432/witty-data-todo" >> ./backend/.env

touch ./frontend/src/lib/axios.js
echo "export const BACKEND_URL = 'http://localhost:4000';" >> ./frontend/src/lib/axios.js

# To run Backend
# cd ./backend
# nvm use 18
# npm install
# npm run start

# To run Frontend
# cd ./frontend
# nvm use 18
# npm install
# npm run start