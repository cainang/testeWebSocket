FROM node:12.18.3-alpine3.12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5674

CMD [ "node", "index.js" ]