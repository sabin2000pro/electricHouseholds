ARG VERSION_TAG=16
FROM node:${VERSION_TAG}
ENV PORT=5200
WORKDIR '/app'
COPY package.json .
RUN npm install --save --legacy-peer-deps
COPY . .
EXPOSE 5200
CMD ["npm", "start"]