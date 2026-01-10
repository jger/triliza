.PHONY: deploy build

deploy: build
	@echo "Deploying to GitHub Pages..."
	npm run deploy

build:
	@echo "Building project..."
	npm run build

