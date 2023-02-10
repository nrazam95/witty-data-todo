FROM node:18.14.0-alpine as builder
WORKDIR /app
COPY . /app/
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.21.1-alpine
EXPOSE 80
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
