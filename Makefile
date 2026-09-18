SHELL := /usr/bin/env bash

ROOT_DIR := $(CURDIR)
SRC_DIR ?= $(ROOT_DIR)/LaSuite
PYTHON ?= python3

# Default repository list (customizable)
# Example:
#   REPOS="docs projects" make clone
REPOS ?= docs projects meet transfers people accounts

DOCKER_COMPOSE ?= $(shell if docker compose version >/dev/null 2>&1; then echo "docker compose"; elif command -v docker-compose >/dev/null 2>&1; then echo "docker-compose"; fi)

export docs_URL ?= git@github.com:waxland/docs.git
export projects_URL ?= https://github.com/suitenumerique/projects.git
export meet_URL ?= https://github.com/suitenumerique/meet.git
export transfers_URL ?= https://github.com/suitenumerique/transfers.git
export people_URL ?= https://github.com/suitenumerique/people.git
export accounts_URL ?= https://github.com/suitenumerique/accounts.git

.DEFAULT_GOAL := help

.PHONY: help
help:
	@printf "DINUM / La Suite dev setup (Monorepo 4 Piliers)\n\n"
	@printf "Controle de Qualite & Validation Globale:\n"
	@printf "  make check              Execute l'integralite du Quality Gate (Builds, Vitest, Playwright, Pytest, Docs SSR)\n\n"
	@printf "Commandes Documentation & Demo:\n"
	@printf "  make docs-dev           Lance le portail documentaire Zudoku (http://localhost:3000)\n"
	@printf "  make docs-build         Compile la documentation Zudoku (SSR 270 routes)\n"
	@printf "  make demo-dev           Lance le demonstrateur web standalone (http://localhost:5173)\n"
	@printf "  make demo-build         Compile le demonstrateur web standalone\n"
	@printf "  make storybook          Lance le Storybook des composants BlockNote (http://localhost:6006)\n"
	@printf "\nCommandes Packages Souverains (Build, Test, Pack & Release):\n"
	@printf "  make packages-test      Execute l'ensemble des tests (15 TS Vitest + 22 Django Pytest)\n"
	@printf "  make packages-build     Compile les bundles TypeScript (ESM, CJS, DTS) et Python (Wheel)\n"
	@printf "  make packages-pack      Genere tous les packages distribuables (.tgz pour npm, .whl pour Python)\n"
	@printf "  make packages-clean     Nettoie tous les artefacts de compilation et archives\n"
	@printf "  make packages-release   Publie une release GitHub avec les 4 binaires (ex: VERSION=v1.0.1 make packages-release)\n\n"
	@printf "Commandes Deploiement Vercel:\n"
	@printf "  make vercel-login       Authentifie le CLI sur votre compte Vercel\n"
	@printf "  make vercel-init        Cree, configure et lie les 4 projets (Docs FR, Docs EN, Demo, Storybook) a GitHub\n"
	@printf "  make vercel-status      Affiche l'etat et les URLs des 4 projets sur Vercel\n"
	@printf "  make deploy-vercel      Deploie manuellement l'ensemble des 4 projets en production\n"
	@printf "  make deploy-demo        Deploie uniquement l'application Demo sur Vercel\n"
	@printf "  make deploy-docs        Deploie uniquement le portail Zudoku FR sur Vercel\n"
	@printf "  make deploy-docs-en     Deploie uniquement le portail Zudoku EN International sur Vercel\n"
	@printf "  make deploy-storybook   Deploie uniquement le Storybook sur Vercel\n\n"
	@printf "Commandes Clones LaSuite:\n"
	@printf "  make install            Verifie Node et installe les dependances npm verrouillees\n"
	@printf "  make clone              Clone les depots dans ./LaSuite\n"
	@printf "  make pull               Met a jour les depots deja clones dans ./LaSuite\n"
	@printf "  make env                Prepare les fichiers .env locaux connus\n"
	@printf "  make bootstrap          Prepare les projets supportes\n"
	@printf "  make dev                Lance les projets supportes en mode dev\n"
	@printf "  make stop               Stoppe les stacks Docker connues\n"
	@printf "  make status             Affiche les containers Docker actifs\n"
	@printf "  make logs-docs          Suit les logs Docs\n"
	@printf "  make logs-projects      Suit les logs Projects\n\n"
	@printf "Exemples:\n"
	@printf "  REPOS=\"docs projects\" make clone\n"
	@printf "  SRC_DIR=/opt/lasuite/LaSuite make dev\n"

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
	@node scripts/check-runtime.mjs
	@npm ci

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

.PHONY: docs-fr-dev
docs-fr-dev: generate-docs-nav
	@npm run docs:fr:dev

.PHONY: docs-fr-build
docs-fr-build: generate-docs-nav
	@npm run docs:fr:build

.PHONY: docs-en-dev
docs-en-dev: generate-docs-nav
	@npm run docs:en:dev

.PHONY: docs-en-build
docs-en-build: generate-docs-nav
	@npm run docs:en:build

.PHONY: demo-dev
demo-dev:
	@npm run demo:dev

.PHONY: demo-build
demo-build:
	@npm run demo:build

.PHONY: storybook
storybook:
	npm run storybook

# -----------------------------------------------------------------------------
# Gestion des Packages Souverains (Build, Test, Pack & Release 100% CLI)
# -----------------------------------------------------------------------------

VERSION ?= v1.0.0

.PHONY: packages-clean
packages-clean:
	@echo "🧹 Nettoyage des artefacts de compilation des packages..."
	@rm -rf packages/*/dist packages/*/*.tgz packages/django-lasuite-sources/build packages/django-lasuite-sources/*.egg-info packages/django-lasuite-sources/.pytest_cache
	@echo "✅ Nettoyage terminé."

.PHONY: packages-test
packages-test:
	@echo "🧪 Execution des tests unitaires TypeScript (Vitest)..."
	@npm run packages:test
	@echo "\n🧪 Execution des tests unitaires Django Backend (Pytest)..."
	@cd packages/django-lasuite-sources && if [ -f .venv/bin/pytest ]; then PYTHONPATH=. .venv/bin/pytest; else PYTHONPATH=. pytest; fi

.PHONY: packages-build
packages-build:
	@echo "🏗️ Compilation des packages TypeScript (@suitenumerique/*)..."
	@npm run packages:build
	@echo "🏗️ Compilation du package Python (django-lasuite-sources)..."
	@cd packages/django-lasuite-sources && $(PYTHON) -m build

.PHONY: packages-pack
packages-pack: packages-build
	@echo "📦 Génération des archives tarballs npm (.tgz)..."
	@cd packages/slash-sources-sdk && npm pack
	@cd packages/blocknote-sources && npm pack
	@echo "✅ Tous les packages (.tgz, .whl, .tar.gz) sont générés et prêts !"
	@ls -lh packages/slash-sources-sdk/*.tgz packages/blocknote-sources/*.tgz packages/django-lasuite-sources/dist/*

.PHONY: packages-release
packages-release: packages-pack
	@echo "🚀 Publication de la release $(VERSION) sur GitHub avec les 4 binaires..."
	@gh release create $(VERSION) \
		packages/slash-sources-sdk/suitenumerique-slash-sources-sdk-*.tgz \
		packages/blocknote-sources/suitenumerique-blocknote-sources-*.tgz \
		packages/django-lasuite-sources/dist/django_lasuite_sources-*-py3-none-any.whl \
		packages/django-lasuite-sources/dist/django_lasuite_sources-*.tar.gz \
		--title "$(VERSION) — Sovereign Slasher Packages Release" \
		--notes "Official release of sovereign packages $(VERSION) for La Suite Numérique and BlockNote." || echo "ℹ️ Note: La release $(VERSION) existe déjà ou a été mise à jour."
	@echo "🔗 Release disponible sur : https://github.com/$(GITHUB_REPO)/releases"

# -----------------------------------------------------------------------------
# Gestion Multi-Projets Vercel (CLI Express & Automatisation)
# -----------------------------------------------------------------------------

export GITHUB_REPO ?= waxland/dinum-setup

.PHONY: vercel-login
vercel-login:
	@echo "🔑 Authentification Vercel..."
	npx vercel login

.PHONY: vercel-init-docs
vercel-init-docs:
	@echo "📚 Initialisation du projet dinum-docs..."
	npx vercel project add dinum-docs || true
	npx vercel project update dinum-docs --root-directory "./" --build-command "npm run build" --output-directory "documentation/dist" --node-version "22.x" --yes
	npx vercel git connect https://github.com/$(GITHUB_REPO) --cwd . --yes || true

.PHONY: vercel-init-demo
vercel-init-demo:
	@echo "⚡ Initialisation du projet dinum-demo..."
	npx vercel project add dinum-demo || true
	npx vercel project update dinum-demo --root-directory "demo" --build-command "cd .. && npm run packages:build && cd demo && npm run build" --output-directory "dist" --framework "vite" --node-version "22.x" --yes
	npx vercel git connect https://github.com/$(GITHUB_REPO) --cwd demo --yes || true

.PHONY: vercel-init-storybook
vercel-init-storybook:
	@echo "🎨 Initialisation du projet dinum-storybook..."
	npx vercel project add dinum-storybook || true
	npx vercel project update dinum-storybook --root-directory "packages/blocknote-sources" --build-command "cd ../.. && npm run packages:build && npm --prefix packages/blocknote-sources run build-storybook" --output-directory "storybook-static" --framework "storybook" --node-version "22.x" --yes
	npx vercel git connect https://github.com/$(GITHUB_REPO) --cwd packages/blocknote-sources --yes || true

.PHONY: vercel-init-docs-en
vercel-init-docs-en:
	@echo "📦 Liaison du projet Vercel: dinum-docs-en (Documentation International)..."
	npx vercel link --cwd documentation-international --yes --project dinum-docs-en || true
	npx vercel git connect https://github.com/$(GITHUB_REPO) --cwd documentation-international --yes || true

.PHONY: vercel-init
vercel-init: vercel-init-docs vercel-init-docs-en vercel-init-demo vercel-init-storybook
	@echo "✅ Les 4 projets Vercel (Docs FR, Docs EN, Demo, Storybook) sont crees, configures et lies a GitHub !"

.PHONY: vercel-status
vercel-status:
	@node scripts/vercel-status.mjs

.PHONY: deploy-demo
deploy-demo:
	@echo "🚀 Deploiement Demo sur Vercel..."
	npx vercel --cwd demo --archive=tgz --prod --yes

.PHONY: deploy-storybook
deploy-storybook:
	@echo "🚀 Deploiement Storybook sur Vercel..."
	npx vercel --cwd packages/blocknote-sources --archive=tgz --prod --yes

.PHONY: deploy-docs
deploy-docs:
	@echo "🚀 Deploiement Documentation Zudoku FR sur Vercel..."
	npx vercel --cwd documentation --archive=tgz --prod --yes

.PHONY: deploy-docs-en
deploy-docs-en:
	@echo "🚀 Deploiement Documentation Zudoku EN International sur Vercel..."
	npx vercel --cwd documentation-international --archive=tgz --prod --yes

.PHONY: deploy-vercel
deploy-vercel: deploy-demo deploy-storybook deploy-docs deploy-docs-en
	@echo "✅ Tous les 4 projets ont ete deployes avec succes sur Vercel !"

# -----------------------------------------------------------------------------
# Quality Gate Global (Validation intégrale conforme aux standards DINUM)
# -----------------------------------------------------------------------------

.PHONY: check
check:
	@node scripts/check-runtime.mjs
	@npm audit --audit-level=low
	@npm run lint
	@npm run typecheck
	@$(PYTHON) -m ruff check packages/django-lasuite-sources
	@$(PYTHON) -m ruff format --check packages/django-lasuite-sources
	@npm run packages:test
	@cd packages/django-lasuite-sources && PYTHONPATH=. $(PYTHON) -m pytest
	@$(MAKE) packages-build
	@npm run demo:build
	@echo "🧪 Execution des tests E2E Playwright..."
	@npm --prefix packages/blocknote-sources run test:e2e
	@npm --prefix packages/blocknote-sources run build-storybook
	@echo "📚 Compilation de la documentation Zudoku (SSR)..."
	@npm run docs:build
	@echo "Quality gate termine : commandes executees avec succes (ne constitue pas un audit RGAA complet)."
