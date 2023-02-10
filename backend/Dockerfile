FROM node:18.14.0-alpine as builder
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
EXPOSE 3000
# RUN npm run migrate:up
CMD ["npm", "run", "start"]

# FROM nginx:1.21.1-alpine
# COPY nginx.conf /etc/nginx/conf.d/default.conf
