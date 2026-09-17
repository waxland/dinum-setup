.PHONY: help install test build clean lint

help:
	@echo "Commandes disponibles pour django-lasuite-sources :"
	@echo "  make install - Installe les dépendances de développement"
	@echo "  make test    - Lance la suite de tests pytest"
	@echo "  make lint    - Vérifie le formatage et le typage"
	@echo "  make build   - Génère le package wheel et sdist"
	@echo "  make clean   - Nettoie les artefacts de build"

install:
	pip install -e ".[test,celery]"

test:
	pytest

lint:
	python -m ruff check lasuite_sources tests || true

build: clean
	python -m build

clean:
	rm -rf dist/ build/ *.egg-info .pytest_cache/
