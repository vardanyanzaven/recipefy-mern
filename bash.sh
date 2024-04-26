#!/bin/bash

MONGO_DB_URL="$1"
MONGO_DB_TEST_URL="$2"
JWT_SECRET="$3"
SPOONACULAR_API_KEY="$4"

echo "$MONGO_DB_URL" > .env
echo "$MONGO_DB_TEST_URL" >> .env
echo "$JWT_SECRET" >> .env
echo "$SPOONACULAR_API_KEY" >> .env
echo "PORT=8000" >> .env
docker system prune
docker pull vardanyanzaven/recipefy-mern:v1
make stop
make start