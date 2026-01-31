.PHONY: deploy build audit-fix

audit-fix:
	npm audit fix

deploy: build
	git pull
	@echo "Deploying to GitHub Pages..."
	npm run deploy

build:
	@echo "Building project..."
	npm run build

