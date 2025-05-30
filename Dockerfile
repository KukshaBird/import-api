ARG NODE_VERSION=lts
FROM node:${NODE_VERSION}

# Install nest globally as root user for development environment
RUN --mount=type=cache,target=/root/.nest \
    npm install -g @nestjs/cli

# Run the application as a non-root user.
USER node
# Use default node dir in node image
WORKDIR /home/node/app

# Create dir for data that use when create database
RUN mkdir data

COPY --chown=node:node . .

RUN --mount=type=cache,target=/root/.npm \
    npm install

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
