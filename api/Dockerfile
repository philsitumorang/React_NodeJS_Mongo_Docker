FROM node:18.12-alpine3.15

RUN mkdir -p /api/src

WORKDIR /api

COPY package.json /api

RUN npm install
RUN npm install -g nodemon
CMD npm start