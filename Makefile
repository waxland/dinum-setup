SHELL := /usr/bin/env bash

ROOT_DIR := $(CURDIR)
SRC_DIR ?= $(ROOT_DIR)/LaSuite

# Default repository list (customizable)
# Example:
#   REPOS="docs projects" make clone
REPOS ?= docs projects meet transfers people accounts

DOCKER_COMPOSE ?= $(shell if docker compose version >/dev/null 2>&1; then echo "docker compose"; elif command -v docker-compose >/dev/null 2>&1; then echo "docker-compose"; fi)

export docs_URL ?= https://github.com/suitenumerique/docs.git
export projects_URL ?= https://github.com/suitenumerique/projects.git
export meet_URL ?= https://github.com/suitenumerique/meet.git
export transfers_URL ?= https://github.com/suitenumerique/transfers.git
export people_URL ?= https://github.com/suitenumerique/people.git
export accounts_URL ?= https://github.com/suitenumerique/accounts.git

.DEFAULT_GOAL := help

.PHONY: help
help:
	@printf "DINUM / La Suite dev setup (4-Pillar Monorepo)

"
	@printf "Documentation & Demo Commands:
"
	@printf "  make docs-dev           Launch Zudoku documentation portal (http://localhost:3000)
"
	@printf "  make docs-build         Build Zudoku documentation (SSR 270 routes)
"
	@printf "  make demo-dev           Launch standalone web demo (http://localhost:5173)
"
	@printf "  make demo-build         Build standalone web demo
"
	@printf "  make storybook          Launch BlockNote components Storybook (http://localhost:6006)
"
	@printf "  make packages-build     Build TypeScript packages (@suitenumerique/*)
"
	@printf "  make packages-test      Run 15 unit and RGAA accessibility tests

"
	@printf "LaSuite Clones Commands:
"
	@printf "  make install            Install system dependencies (Docker plugins, etc.)
"
	@printf "  make clone              Clone repositories into ./LaSuite
"
	@printf "  make pull               Update already cloned repositories in ./LaSuite
"
	@printf "  make env                Prepare local .env files
"
	@printf "  make bootstrap          Bootstrap supported projects
"
	@printf "  make dev                Launch supported projects in dev mode
"
	@printf "  make stop               Stop known Docker stacks
"
	@printf "  make status             Display active Docker containers
"
	@printf "  make logs-docs          Tail Docs logs
"
	@printf "  make logs-projects      Tail Projects logs
"
	@printf "
Examples:
"
	@printf "  REPOS="docs projects" make clone
"
	@printf "  SRC_DIR=/opt/lasuite/LaSuite make dev
"

.PHONY: check-tools
check-tools:
	@command -v git >/dev/null || (echo "Error: git is not installed" >&2; exit 1)
	@command -v make >/dev/null || (echo "Error: make is not installed" >&2; exit 1)
	@command -v docker >/dev/null || (echo "Error: docker is not installed" >&2; exit 1)
	@[ -n "$(DOCKER_COMPOSE)" ] || (echo "Error: docker compose / docker-compose is not installed" >&2; exit 1)

.PHONY: prepare-docker
prepare-docker:
	@docker network create lasuite-network >/dev/null 2>&1 || true
	@if ! docker image inspect minio/minio:latest >/dev/null 2>&1; then 		echo "Preparing MinIO image (quay.io)..."; 		docker pull quay.io/minio/minio:latest >/dev/null 2>&1 && 		docker tag quay.io/minio/minio:latest minio/minio:latest; 	fi
	@if ! docker image inspect minio/mc:latest >/dev/null 2>&1; then 		echo "Preparing MinIO Client image (quay.io)..."; 		docker pull quay.io/minio/mc:latest >/dev/null 2>&1 && 		docker tag quay.io/minio/mc:latest minio/mc:latest; 	fi

.PHONY: install
install:
	@./install.sh

.PHONY: clone
clone: check-tools
	@mkdir -p "$(SRC_DIR)"
	@for repo in $(REPOS); do 		url_var="$${repo}_URL"; 		url="$${!url_var}"; 		if [ -z "$$url" ]; then 			echo "Unknown URL for $$repo, skipping."; 			continue; 		fi; 		if [ -d "$(SRC_DIR)/$$repo/.git" ]; then 			echo "$$repo already cloned."; 		else 			echo "Cloning $$repo..."; 			git clone "$$url" "$(SRC_DIR)/$$repo"; 		fi; 	done

.PHONY: pull
pull:
	@for repo in $(REPOS); do 		if [ -d "$(SRC_DIR)/$$repo/.git" ]; then 			echo "Updating $$repo..."; 			git -C "$(SRC_DIR)/$$repo" pull --ff-only; 		fi; 	done

.PHONY: env
env: env-docs env-projects env-meet env-transfers env-people env-accounts

.PHONY: env-docs
env-docs:
	@if [ -d "$(SRC_DIR)/docs" ]; then 		echo "Preparing Docs env..."; 		mkdir -p "$(SRC_DIR)/docs/env.d/development"; 		touch "$(SRC_DIR)/docs/env.d/development/crowdin.local" 			"$(SRC_DIR)/docs/env.d/development/common.local" 			"$(SRC_DIR)/docs/env.d/development/postgresql.local" 			"$(SRC_DIR)/docs/env.d/development/kc_auth.local" 			"$(SRC_DIR)/docs/env.d/development/kc_postgresql.local"; 	fi

.PHONY: env-projects
env-projects:
	@if [ -d "$(SRC_DIR)/projects" ]; then 		echo "Preparing Projects env..."; 		if [ -f "$(SRC_DIR)/projects/server/.env.sample" ] && [ ! -f "$(SRC_DIR)/projects/server/.env" ]; then 			cp "$(SRC_DIR)/projects/server/.env.sample" "$(SRC_DIR)/projects/server/.env"; 		fi; 		if ! grep -q "auth.local" /etc/hosts; then 			echo "Recommended manual action for Projects:"; 			echo "  add '127.0.0.1 auth.local' to /etc/hosts"; 		fi; 	fi

.PHONY: env-meet
env-meet:
	@if [ -d "$(SRC_DIR)/meet" ]; then 		echo "Meet clone present. See docs/meet.md for configuration."; 	fi

.PHONY: env-transfers
env-transfers:
	@if [ -d "$(SRC_DIR)/transfers" ]; then 		echo "Transfers clone present. See docs/transfers.md before connecting."; 	fi

.PHONY: env-people
env-people:
	@if [ -d "$(SRC_DIR)/people" ]; then 		echo "People clone present. See docs/people.md before connecting."; 	fi

.PHONY: env-accounts
env-accounts:
	@if [ -d "$(SRC_DIR)/accounts" ]; then 		echo "Accounts clone present. See docs/accounts.md before connecting."; 	fi

.PHONY: bootstrap
bootstrap: clone env prepare-docker bootstrap-docs bootstrap-projects

.PHONY: bootstrap-docs
bootstrap-docs:
	@if [ -d "$(SRC_DIR)/docs" ]; then 		echo "Bootstrapping Docs..."; 		$(MAKE) -C "$(SRC_DIR)/docs" bootstrap FLUSH_ARGS='--no-input'; 	fi

.PHONY: bootstrap-projects
bootstrap-projects:
	@if [ -d "$(SRC_DIR)/projects" ]; then 		echo "Projects bootstraps on first docker compose dev."; 	fi

.PHONY: dev
dev: clone env prepare-docker dev-docs dev-projects dev-meet dev-transfers dev-people dev-accounts

.PHONY: dev-docs
dev-docs:
	@if [ -d "$(SRC_DIR)/docs" ]; then 		echo "Launching Docs..."; 		$(MAKE) -C "$(SRC_DIR)/docs" run; 	fi

.PHONY: dev-projects
dev-projects:
	@if [ -d "$(SRC_DIR)/projects" ]; then 		echo "Launching Projects..."; 		cd "$(SRC_DIR)/projects" && $(DOCKER_COMPOSE) -f docker-compose-dev.yml up -d; 	fi

.PHONY: dev-meet
dev-meet:
	@if [ -d "$(SRC_DIR)/meet" ]; then 		echo "Meet is not started automatically: LiveKit/OIDC/domains must be configured first."; 	fi

.PHONY: dev-transfers
dev-transfers:
	@if [ -d "$(SRC_DIR)/transfers" ]; then 		echo "Transfers is not started automatically: verify upstream README before connecting."; 	fi

.PHONY: dev-people
dev-people:
	@if [ -d "$(SRC_DIR)/people" ]; then 		echo "People is not started automatically: verify upstream README before connecting."; 	fi

.PHONY: dev-accounts
dev-accounts:
	@if [ -d "$(SRC_DIR)/accounts" ]; then 		echo "Accounts is not started automatically: verify upstream README before connecting."; 	fi

.PHONY: stop
stop:
	@for repo in docs projects meet transfers people accounts; do 		if [ -d "$(SRC_DIR)/$$repo" ]; then 			echo "Stopping $$repo..."; 			(cd "$(SRC_DIR)/$$repo" && $(DOCKER_COMPOSE) down 2>/dev/null || true); 			(cd "$(SRC_DIR)/$$repo" && $(DOCKER_COMPOSE) -f docker-compose-dev.yml down 2>/dev/null || true); 		fi; 	done

.PHONY: status
status:
	@docker ps --format "table {{.Names}}	{{.Status}}	{{.Ports}}"

.PHONY: logs-docs
logs-docs:
	@$(MAKE) -C "$(SRC_DIR)/docs" logs

.PHONY: logs-projects
logs-projects:
	@cd "$(SRC_DIR)/projects" && $(DOCKER_COMPOSE) -f docker-compose-dev.yml logs -f --tail=200

.PHONY: generate-docs-nav
generate-docs-nav:
	@npm run docs:nav

.PHONY: docs-dev
docs-dev: generate-docs-nav
	@npm run docs:dev

.PHONY: docs-build
docs-build: generate-docs-nav
	@npm run docs:build

.PHONY: docs-preview
docs-preview:
	@npm run docs:preview

.PHONY: demo-dev
demo-dev:
	@npm run demo:dev

.PHONY: demo-build
demo-build:
	@npm run demo:build

.PHONY: storybook
storybook:
	npm run storybook

.PHONY: packages-build
packages-build:
	npm run packages:build

.PHONY: packages-test
packages-test:
	npm run packages:test
