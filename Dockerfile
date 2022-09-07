FROM node:16.17-alpine 
# Install bash
RUN apk add --no-cache bash
# Temp directory
WORKDIR /app
