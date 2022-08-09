FROM node:18.7.0
ENV PORT=5200
WORKDIR '/app'
COPY package.json .
RUN npm install --save
RUN apt-get update; \
apt-get install -y wget; \
wget https://download.docker.com/linux/static/stable/x86_64/docker-20.10.9.tgz; \
tar zxvf docker-20.10.9.tgz;
COPY . .
EXPOSE 5200
CMD ["npm", "start"]