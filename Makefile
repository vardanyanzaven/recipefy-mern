SHELL := /bin/bash

start:
	docker-compose up -d

stop:
	docker-compose down --remove-orphans