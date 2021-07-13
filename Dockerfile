FROM node:lts-alpine

RUN mkdir -p /home/app/node_modules

WORKDIR /home/app

RUN apk add --no-cache git

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 3333

ENTRYPOINT ["./entrypoint.sh"]
