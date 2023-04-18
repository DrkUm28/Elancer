# Build Stage
FROM node:14-alpine as build

ARG API_URL
ARG API_PORT

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json .
COPY yarn.lock .

RUN yarn install --pure-lockfile

COPY . .

RUN REACT_APP_API_URL=${API_URL} \
  REACT_APP_API_PORT=${API_PORT} \
  yarn build

# NGINX
FROM nginx:1.17.8-alpine

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
