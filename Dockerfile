FROM node:12.13.1

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

RUN npm install --silent

COPY . /app/

EXPOSE 3000
