# Environment Setup and Running Instructions

## Environment Configuration

1. Create a `.env` file in the root directory as .env.example
2. Create a `.env` file in database directory as .env.example
3. Configure the following environment variables:

## .env

```.dotenv
PORT=3000
VERSION=1

# DATABASE
DATABASE_HOST=postgres-dev
DATABASE_PASSWORD=admin
DATABASE_USER=admin
DATABASE_NAME=products

# REDIS
REDIS_HOST=redis
REDIS_PORT=6379
```

## database/.env

```.dotenv
POSTGRES_PASSWORD=admin
POSTGRES_USER=admin
POSTGRES_DB=products
```

## Running with Docker Compose

```shell
docker compose up --watch
```

# Endpoints

###  Swagger

``localhost:{RORT}/api``

### Routs

In ``./http`` folder you may find all routs.