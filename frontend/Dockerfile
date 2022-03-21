FROM node:16
USER root
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD [ "npm", "start" ]