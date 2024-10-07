FROM node:18

WORKDIR /MyApp
COPY package.json .
RUN npm install

COPY . .
CMD npm start
