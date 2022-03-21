ARG VERSION_TAG=16
FROM node:${VERSION_TAG}
ENV PORT=5200
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5200
HEALTHCHECK --interval=10s --timeout=30s --start-period=5s --retries=3 \
CMD curl localhost:5200/
CMD ["npm", "start"]