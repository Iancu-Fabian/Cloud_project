FROM node:17-alpine

WORKDIR /app

COPY . .

RUN npm install nodemon

RUN npm install

EXPOSE 5000

CMD ["node", "server.js"]