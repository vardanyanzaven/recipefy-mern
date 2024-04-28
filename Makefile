SHELL := /bin/bash

start:
	docker-compose up -d

stop:
	docker-compose down --remove-orphans

build:
	docker image build -t vardanyanzaven/recipefy-mern:v1 --platform linux/amd64 .