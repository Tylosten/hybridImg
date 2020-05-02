FROM node:12.16.3-alpine3.9 as builder

RUN apk add --no-cache \
  python \
  make \
  g++

WORKDIR /app
COPY . ./
RUN yarn build-all
RUN mkdir ./to_copy && mv ./public ./build ./package.json ./yarn.lock ./to_copy


FROM node:12.16.3-alpine3.9
WORKDIR /app
COPY --from=builder /app/to_copy ./
RUN yarn install --production

CMD ["yarn", "prod-start"]
