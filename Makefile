CLIENT_NAME = "example-client"
SERVER_NAME = "example-server"

.PHONY: help

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

# -----------------------------------------------
define ssh_cmd
	docker exec -it $(1) bash
endef

define kill_cmd
	docker kill $(1)
endef

define rmi_cmd
	docker rmi -f $(1)
endef

# -----------------------------------------------
server-build: ## Build docker image for the express server
	docker build --rm -t $(SERVER_NAME):latest server/

server-start: ## Run the express server container
	docker run --rm -d -v `pwd`/uploads:/opt/uploads -p 5000:5000 -h $(SERVER_NAME) --name $(SERVER_NAME) $(SERVER_NAME):latest

server-ssh: ## Open a bash session in the running server container
	$(call ssh_cmd,$(SERVER_NAME))

server-stop: ## Kill the server container
	$(call kill_cmd,$(SERVER_NAME))

server-rmi: ## Destroy the server image
	$(call rmi_cmd,$(SERVER_NAME))

server-test: ## Send a request to the server up page
	curl localhost:5000/up

# -----------------------------------------------
client-build: ## Build docker image for the react app
	docker build --rm -t $(CLIENT_NAME):latest client/
	docker rmi `docker images --filter "dangling=true" -q --no-trunc`

client-start: ## Run the react app container
	docker run --rm -d -p 80:80 --link $(SERVER_NAME):example-server -h $(CLIENT_NAME) --name $(CLIENT_NAME) $(CLIENT_NAME):latest

client-ssh: ## Open a bash session in the running client container
	$(call ssh_cmd,$(CLIENT_NAME))

client-stop: ## Kill the client container
	$(call kill_cmd,$(CLIENT_NAME))

client-rmi: ## Destroy the client image
	$(call rmi_cmd,$(CLIENT_NAME))

# -----------------------------------------------
build: server-build client-build ## Build server and client images
start: server-start client-start ## Start server and client containers
stop: server-stop client-stop ## Stop server and client containers
rmi: server-rmi client-rmi ## Remove server and client images

# -----------------------------------------------
dev-build: ## Builds the client and server in dev mode
	cd server/ && npm install
	cd client/ && npm install

dev-start: ## Start the client and server in dev mode
	concurrently --kill-others-on-fail "cd `pwd`/server/ && npm run dev-start" "cd `pwd`/client/ && npm run dev-start"

dev-run: dev-build dev-start

# -----------------------------------------------
setup: scrub
	cd server/scripts && pip install -r requirements.pip
	# virtualenv server/scripts/.venv
	# cd server/scripts && . .venv/bin/activate && pip install -r requirements.pip

install: clean
	cd server/scripts && pip install -r requirements.pip
	# cd server/scripts && . .venv/bin/activate && pip install -r requirements.pip

scrub: clean
	find . -name 'node_modules' -type d -prune -exec rm -rf '{}' '+'
	find . -name '*.egg-info' -type d -prune -exec rm -rf '{}' '+'
	# cd server/scripts && rm -rf .venv

clean:
	find . -name '*.pyc' -exec rm '{}' ';'
	find . -name '__pycache__' -type d -prune -exec rm -rf '{}' '+'
	find . -name '.pytest_cache' -type d -prune -exec rm -rf '{}' '+'
	find . -name 'build' -type d -prune -exec rm -rf '{}' '+'
