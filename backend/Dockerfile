FROM node:18.14.0-alpine as builder
WORKDIR /app
COPY package*.json /app/
# COPY .env /app/
RUN npm install
COPY . /app/
EXPOSE 3000
RUN npm run migrate:up
CMD ["npm", "run", "start"]