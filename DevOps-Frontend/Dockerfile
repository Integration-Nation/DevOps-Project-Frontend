FROM node:18-alpine3.17 as build

ARG VITE_ENDPOINT
ENV VITE_ENDPOINT=${VITE_ENDPOINT}

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build

FROM ubuntu
RUN apt-get update
RUN apt-get install nginx -y
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /var/www/html/
EXPOSE 80
CMD ["nginx","-g","daemon off;"]