FROM node:16-alpine

RUN apk update && apk upgrade && apk add --no-cache bash git openssh

WORKDIR /react

COPY package*.json ./

RUN npm install --force


COPY . .

CMD [ "npm", "start" ]