FROM node:14.0.0-alpine3.11 as builder

RUN apk add --no-cache \
  python \
  make \
  g++

WORKDIR /app
COPY . ./
RUN yarn build-all
RUN mkdir ./to_copy && mv ./public ./views ./build ./package.json ./yarn.lock ./.reactful.json ./to_copy


FROM node:14.0.0-alpine3.11
WORKDIR /app
COPY --from=builder /app/to_copy ./
RUN yarn install --production

EXPOSE 8080
CMD ["yarn", "prod-start"]
