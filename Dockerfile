FROM node:lts-alpine

ENV NODE_ENV=production

WORKDIR /app

RUN npm install -g typescript

COPY package.json ./
RUN npm install --omit=dev

COPY typings/ typings/

COPY client/ client/
RUN cd client
RUN npm install 
RUN npm run build

COPY server/ server/
RUN cd server
RUN npm install --omit=dev
RUN npm run build

CMD [ "npm", "run", "start-prod", "--prefix", "server" ]

USER node

EXPOSE 8000