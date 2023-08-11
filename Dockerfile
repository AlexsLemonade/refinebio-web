ARG NODE_VER=18.17-alpine 

#  
# Dependency Installation
#
FROM node:$NODE_VER as deps
# Install bash
RUN apk add --no-cache bash
# Temp directory
WORKDIR /app
# Install dependencies
COPY package.json yarn.lock ./
RUN yarn set version 3.6.1
RUN yarn install

#
# Local(development)
#
FROM node:$NODE_VER as local
# Install bash
RUN apk add --no-cache bash
# Temp directory
WORKDIR /app
COPY --from=deps . .

#
# Test
#

#
# Production
#
