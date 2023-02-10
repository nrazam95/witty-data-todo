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

touch ./frontend/.env
echo "export const BACKEND_URL = 'http://localhost:4000';" >> ./frontend/src/lib/axios.js

# Delete the echo frontend
# rm ./frontend/src/lib/axios.js
# touch ./frontend/.src/lib/axios.js