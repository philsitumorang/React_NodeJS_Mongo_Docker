FROM node:18.12-alpine3.15

RUN mkdir -p /frontend

WORKDIR /frontend

COPY package.json /frontend
COPY tsconfig.json /frontend

RUN npm install
CMD npm start