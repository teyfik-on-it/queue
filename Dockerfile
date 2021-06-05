FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY src ./src
COPY nest-cli.json ./
COPY tsconfig*.json ./

RUN npm run build

CMD ['npm', 'start']
