FROM node:6
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]