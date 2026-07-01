.PHONY: help dev build deploy audit audit-fix smoke

.DEFAULT_GOAL := help

help: ## Show available targets
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_-]+:.*?## / {printf "  %-12s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

dev: ## Start Next.js dev server and open http://localhost:3000/triliza
	@./scripts/dev.sh

build: ## Production build (static export to out/)
	@echo "Building project..."
	npm run build

deploy: ## Pull, build, and deploy to GitHub Pages
	git pull
	$(MAKE) build
	@echo "Deploying to GitHub Pages..."
	npm run deploy

audit: ## Run npm security audit
	npm audit

audit-fix: ## Fix npm vulnerabilities where possible
	npm audit fix

smoke: ## Build and verify production output
	@./scripts/smoke-test.sh
