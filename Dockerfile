FROM node:20.17.0-alpine
WORKDIR /app

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN yarn

COPY ./ /app
RUN yarn build

CMD ["yarn", "start"]
EXPOSE 3000