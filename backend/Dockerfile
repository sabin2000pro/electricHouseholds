
FROM node:latest
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5200
CMD ["npm", "start"]