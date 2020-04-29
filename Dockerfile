FROM node:14.0.0-alpine3.11 as builder

RUN apk add --no-cache \
  python \
  make \
  g++

WORKDIR /app
COPY . ./
RUN yarn build-all


FROM node:14.0.0-alpine3.11
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/views ./views
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/.reactful.json ./.reactful.json
RUN yarn install --production

EXPOSE 8080
CMD ["yarn", "prod-start"]
