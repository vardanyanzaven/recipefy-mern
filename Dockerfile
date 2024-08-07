FROM node:lts-alpine

WORKDIR /app

RUN npm install -g typescript

COPY package*.json ./
RUN npm install --omit=dev

COPY client/package*.json client/
RUN npm install --omit=dev --prefix client

COPY server/package*.json server/
RUN npm install --omit=dev --prefix server

COPY typings/ typings/

COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/
RUN npm run build --prefix server

CMD [ "npm", "run", "start-server-dist" ]

USER node

EXPOSE 8000