FROM node:18.7.0
ENV PORT=5200
WORKDIR '/app'
COPY package.json .
RUN npm install --save
COPY . .
EXPOSE 5200
CMD ["npm", "start"]