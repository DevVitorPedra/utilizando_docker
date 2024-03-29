FROM node:16.8-alpine

WORKDIR /usr/app

COPY package.json package-lock.json ./

ENV SECRET = ${SECRET}

RUN npm install

COPY . .

EXPOSE 3333


CMD [ "npm","start" ]
