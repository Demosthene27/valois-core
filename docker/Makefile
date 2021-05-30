.PHONY: build clean coldstart mrproper up
all: up

valois_network := $(shell grep ^ENV_VALOIS_NETWORK= .env |tail -n 1 |awk -F = '{ print $$2 }')
ifeq ($(valois_network),)
valois_network := mainnet
endif

up:
	docker-compose up -d

compose := docker-compose -f docker-compose.yml -f docker-compose.make.yml
coldstart: up
	docker-compose stop valois
ifeq ($(valois_network),$(filter $(valois_network),mainnet testnet betanet))
	$(compose) run --rm --entrypoint /home/valois/coldstart.sh valois-task $(valois_network)
else
	# workaround for https://github.com/ValoisHQ/valois-sdk/issues/5798
	$(compose) run --rm --entrypoint /bin/rm valois-task -f /home/valois/.valois/default/tmp/pids/controller.pid
	$(compose) run --rm valois-task blockchain:reset --yes
endif
	docker-compose start valois

LOGS_TAIL_LINES?=1000
LOGS_BUNYAN_OPTIONS=-o short
logs:
	docker logs --tail=$(LOGS_TAIL_LINES) --follow $$( docker-compose ps --quiet valois ) |docker-compose exec -T valois npx bunyan $(LOGS_BUNYAN_OPTIONS)

# for backwards compatibility
clean:
	true

mrproper:
	docker-compose down --volumes --remove-orphans


ifeq ($(CORE_VERSION),)
CORE_VERSION := $(shell jq --raw-output .version ../package.json )
endif
build:
	docker build --build-arg REGISTRY_URL=https://npm.valois.io --build-arg NODEJS_VERSION=$(shell cat ../.nvmrc ) --build-arg CORE_VERSION=$(CORE_VERSION) -t=valois/core:$(CORE_VERSION) .
