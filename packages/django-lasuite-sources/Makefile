# Makefile for django-lasuite-sources

.PHONY: help install test build clean lint

help:
	@echo "Available commands for django-lasuite-sources:"
	@echo "  make install - Install development dependencies"
	@echo "  make test    - Run pytest test suite"
	@echo "  make lint    - Check formatting and typing"
	@echo "  make build   - Generate wheel and sdist packages"
	@echo "  make clean   - Clean build artifacts"

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
