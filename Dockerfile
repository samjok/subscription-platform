FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 8084
CMD [ "npx", "ts-node", "index.ts" ]

