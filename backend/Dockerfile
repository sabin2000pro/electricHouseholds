ARG VERSION_TAG=16
FROM node:${VERSION_TAG}
ENV PORT=5200
WORKDIR '/app'
COPY package.json .
RUN npm install --save --legacy-peer-deps
RUN curl -fsSLO https://get.docker.com/builds/Linux/x86_64/docker-17.04.0-ce.tgz \
  && tar xzvf docker-17.04.0-ce.tgz \
  && mv docker/docker /usr/local/bin \
  && rm -r docker docker-17.04.0-ce.tgz
COPY . .
EXPOSE 5200
CMD ["npm", "start"]