FROM node:20-slim

WORKDIR /app

COPY ./service/staticWeb/src/package.json /app/

RUN yarn install

COPY ./service/staticWeb/src /app

