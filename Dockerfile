FROM node:16.10-alpine as builder

COPY . ./app
WORKDIR /app

RUN npm i
RUN $(npm bin)/ng build --prod

FROM nginx:1.15.8-alpine
COPY --from=builder /app/dist/angular-se-track/ /usr/share/nginx/html
