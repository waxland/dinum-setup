SHELL := /usr/bin/env bash

ROOT_DIR := $(CURDIR)
SRC_DIR ?= $(ROOT_DIR)/src

# Liste par defaut volontairement modifiable.
# Exemple:
#   REPOS="docs projects" make clone
REPOS ?= docs projects meet transfers people accounts

docs_URL := https://github.com/suitenumerique/docs.git
projects_URL := https://github.com/suitenumerique/projects.git
meet_URL := https://github.com/suitenumerique/meet.git
transfers_URL := https://github.com/suitenumerique/transfers.git
people_URL := https://github.com/suitenumerique/people.git
accounts_URL := https://github.com/suitenumerique/accounts.git

.DEFAULT_GOAL := help

.PHONY: help
help:
	@printf "DINUM / La Suite dev setup\n\n"
	@printf "Commandes principales:\n"
	@printf "  make clone              Clone les depots dans ./src\n"
	@printf "  make pull               Met a jour les depots deja clones\n"
	@printf "  make env                Prepare les fichiers .env locaux connus\n"
	@printf "  make bootstrap          Prepare les projets supportes\n"
	@printf "  make dev                Lance les projets supportes en mode dev\n"
	@printf "  make stop               Stoppe les stacks Docker connues\n"
	@printf "  make status             Affiche les containers Docker actifs\n"
	@printf "  make logs-docs          Suit les logs Docs\n"
	@printf "  make logs-projects      Suit les logs Projects\n"
	@printf "  make generate-docs-nav  Genere zudoku.navigation.tsx\n"
	@printf "  make docs-dev           Lance la documentation en local\n"
	@printf "\nExemples:\n"
	@printf "  REPOS=\"docs projects\" make clone\n"
	@printf "  SRC_DIR=/opt/lasuite/src make dev\n"

.PHONY: check-tools
check-tools:
	@command -v git >/dev/null
	@command -v make >/dev/null
	@command -v docker >/dev/null
	@docker compose version >/dev/null

.PHONY: clone
clone: check-tools
	@mkdir -p "$(SRC_DIR)"
	@for repo in $(REPOS); do \
		url_var="$${repo}_URL"; \
		url="$${!url_var}"; \
		if [ -z "$$url" ]; then \
			echo "URL inconnue pour $$repo, ignore."; \
			continue; \
		fi; \
		if [ -d "$(SRC_DIR)/$$repo/.git" ]; then \
			echo "$$repo deja clone."; \
		else \
			echo "Clone $$repo..."; \
			git clone "$$url" "$(SRC_DIR)/$$repo"; \
		fi; \
	done

.PHONY: pull
pull:
	@for repo in $(REPOS); do \
		if [ -d "$(SRC_DIR)/$$repo/.git" ]; then \
			echo "Mise a jour $$repo..."; \
			git -C "$(SRC_DIR)/$$repo" pull --ff-only; \
		fi; \
	done

.PHONY: env
env: env-docs env-projects env-meet env-transfers env-people env-accounts

.PHONY: env-docs
env-docs:
	@if [ -d "$(SRC_DIR)/docs" ]; then \
		echo "Preparation env Docs..."; \
		mkdir -p "$(SRC_DIR)/docs/env.d/development"; \
		touch "$(SRC_DIR)/docs/env.d/development/crowdin.local" \
			"$(SRC_DIR)/docs/env.d/development/common.local" \
			"$(SRC_DIR)/docs/env.d/development/postgresql.local" \
			"$(SRC_DIR)/docs/env.d/development/kc_auth.local" \
			"$(SRC_DIR)/docs/env.d/development/kc_postgresql.local"; \
	fi

.PHONY: env-projects
env-projects:
	@if [ -d "$(SRC_DIR)/projects" ]; then \
		echo "Preparation env Projects..."; \
		if [ -f "$(SRC_DIR)/projects/server/.env.sample" ] && [ ! -f "$(SRC_DIR)/projects/server/.env" ]; then \
			cp "$(SRC_DIR)/projects/server/.env.sample" "$(SRC_DIR)/projects/server/.env"; \
		fi; \
		if ! grep -q "auth.local" /etc/hosts; then \
			echo "Action manuelle recommandee pour Projects:"; \
			echo "  ajouter '127.0.0.1 auth.local' dans /etc/hosts"; \
		fi; \
	fi

.PHONY: env-meet
env-meet:
	@if [ -d "$(SRC_DIR)/meet" ]; then \
		echo "Meet clone present. Voir docs/meet.md pour la configuration."; \
	fi

.PHONY: env-transfers
env-transfers:
	@if [ -d "$(SRC_DIR)/transfers" ]; then \
		echo "Transfers clone present. Voir docs/transfers.md avant cablage."; \
	fi

.PHONY: env-people
env-people:
	@if [ -d "$(SRC_DIR)/people" ]; then \
		echo "People clone present. Voir docs/people.md avant cablage."; \
	fi

.PHONY: env-accounts
env-accounts:
	@if [ -d "$(SRC_DIR)/accounts" ]; then \
		echo "Accounts clone present. Voir docs/accounts.md avant cablage."; \
	fi

.PHONY: bootstrap
bootstrap: clone env bootstrap-docs bootstrap-projects

.PHONY: bootstrap-docs
bootstrap-docs:
	@if [ -d "$(SRC_DIR)/docs" ]; then \
		echo "Bootstrap Docs..."; \
		$(MAKE) -C "$(SRC_DIR)/docs" bootstrap FLUSH_ARGS='--no-input'; \
	fi

.PHONY: bootstrap-projects
bootstrap-projects:
	@if [ -d "$(SRC_DIR)/projects" ]; then \
		echo "Projects se prepare au premier docker compose dev."; \
	fi

.PHONY: dev
dev: clone env dev-docs dev-projects dev-meet dev-transfers dev-people dev-accounts

.PHONY: dev-docs
dev-docs:
	@if [ -d "$(SRC_DIR)/docs" ]; then \
		echo "Lancement Docs..."; \
		$(MAKE) -C "$(SRC_DIR)/docs" run; \
	fi

.PHONY: dev-projects
dev-projects:
	@if [ -d "$(SRC_DIR)/projects" ]; then \
		echo "Lancement Projects..."; \
		cd "$(SRC_DIR)/projects" && docker compose -f docker-compose-dev.yml up -d; \
	fi

.PHONY: dev-meet
dev-meet:
	@if [ -d "$(SRC_DIR)/meet" ]; then \
		echo "Meet n'est pas lance automatiquement: LiveKit/OIDC/domaines doivent etre choisis avant."; \
	fi

.PHONY: dev-transfers
dev-transfers:
	@if [ -d "$(SRC_DIR)/transfers" ]; then \
		echo "Transfers n'est pas lance automatiquement: verifier le README upstream avant cablage."; \
	fi

.PHONY: dev-people
dev-people:
	@if [ -d "$(SRC_DIR)/people" ]; then \
		echo "People n'est pas lance automatiquement: verifier le README upstream avant cablage."; \
	fi

.PHONY: dev-accounts
dev-accounts:
	@if [ -d "$(SRC_DIR)/accounts" ]; then \
		echo "Accounts n'est pas lance automatiquement: verifier le README upstream avant cablage."; \
	fi

.PHONY: stop
stop:
	@for repo in docs projects meet transfers people accounts; do \
		if [ -d "$(SRC_DIR)/$$repo" ]; then \
			echo "Stop $$repo..."; \
			(cd "$(SRC_DIR)/$$repo" && docker compose down 2>/dev/null || true); \
			(cd "$(SRC_DIR)/$$repo" && docker compose -f docker-compose-dev.yml down 2>/dev/null || true); \
		fi; \
	done

.PHONY: status
status:
	@docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

.PHONY: logs-docs
logs-docs:
	@$(MAKE) -C "$(SRC_DIR)/docs" logs

.PHONY: logs-projects
logs-projects:
	@cd "$(SRC_DIR)/projects" && docker compose -f docker-compose-dev.yml logs -f --tail=200

.PHONY: generate-docs-nav
generate-docs-nav:
	node scripts/generate-docs-navigation.mjs

.PHONY: docs-dev
docs-dev: generate-docs-nav
	@npm run docs:dev

.PHONY: docs-build
docs-build: generate-docs-nav
	@npm run docs:build

.PHONY: docs-preview
docs-preview:
	@npm run docs:preview
