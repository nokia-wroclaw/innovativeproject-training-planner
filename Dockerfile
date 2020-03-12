FROM node:alpine as react_builder
COPY . /app
WORKDIR /app/client
RUN npm install --only=production
RUN npm run build

FROM node:alpine as node_builder
COPY --from=react_builder /app/server .
RUN npm install --only=production

FROM node:alpine
COPY --from=node_builder . /app/server
COPY --from=react_builder /app/client/build /app/client
CMD [ "node", "/app/server/server.js" ]
