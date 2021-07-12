FROM node:lts-alpine

RUN mkdir -p /home/app/node_modules

WORKDIR /home/app

RUN apk add --no-cache git

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN mkdir tmp
RUN node ace build
RUN node ace migration:run

EXPOSE 3333

ENTRYPOINT ["node","ace","serve","--watch"]
