FROM node:alpine as react_builder
COPY . /app
WORKDIR /app/client
RUN npm install --only=prod --no-fund --no-optional --loglevel warn
RUN npm run build

FROM node:alpine as node_builder
COPY --from=react_builder /app/server .
RUN npm install --only=prod --no-fund

FROM node:alpine
COPY --from=node_builder . /app/server
COPY --from=react_builder /app/client/build /app/client
CMD [ "node", "/app/server/server.js" ]
