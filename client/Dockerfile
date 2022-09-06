FROM node:16.17-alpine 
# Temp directory
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install 
COPY next.config.js ./next.config.js

# NOTE: CMD is defined in docker-compose.yml to overwrite the default port 3000
