# This makefile should run download all necessary dependencies (including Node itself).
# It will create local ./npm and ./node executables that can be used so you don't need
# to pollute your global system.

OS := $(shell uname | tr '[:upper:]' '[:lower:]')
SITE_NAME="slate"

NODE_VERSION=v7.9.0
NODE_PLATFORM=${OS}-x64

YARN_VERSION=0.23.2

NODE_DOWNLOAD=http://nodejs.org/dist/$(NODE_VERSION)/node-$(NODE_VERSION)-$(NODE_PLATFORM).tar.gz
NODE_HOME=.node-local
NODE_INSTALLED=$(NODE_HOME)/.installed-$(NODE_VERSION)-$(NODE_PLATFORM)

HUGO_DOWNLOAD=https://github.com/spf13/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}
YARN_DOWNLOAD=https://yarnpkg.com/downloads/${YARN_VERSION}/yarn-v${YARN_VERSION}.tar.gz

VERSION=$(shell git describe --always --tags)
DIRTY=$(shell test -n "`git status --porcelain`" && echo "+CHANGES" || true)

BUILD_DIR=bin

DIST:=find * -type d -exec

default: build

.PHONY: help
help:
	@echo 'Management commands for $(SITE_NAME):'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-30s\033[0m %s\n", $$1, $$2}'

## Download and peform local install of Node (will not affect anything else on the system)
.PHONY: install-node
install-node: $(NODE_INSTALLED)
bin/node bin/npm $(NODE_INSTALLED):
	@echo
	@echo === Downloading Node $(NODE_VERSION)... ===
	rm -rf $(NODE_HOME)
	mkdir -p $(NODE_HOME)
	curl $(NODE_DOWNLOAD) | tar xzf - --strip-components=1 --directory $(NODE_HOME)
	rm -rf ./bin
	mkdir -p ./bin
	ln -f -s ../$(NODE_HOME)/bin/node ./bin/
	ln -f -s ../$(NODE_HOME)/bin/npm  ./bin/
	touch $(NODE_INSTALLED)

# Install Node library deps
.PHONY: deps
deps: node_modules/.uptodate ## Install all dependencies
node_modules/.uptodate: bin/npm bin/yarn
	@echo
	@echo === Installing libraries via Yarn... ===
	./bin/yarn
	ln -f -s ../node_modules/gulp/bin/gulp.js ./bin/gulp
	touch $@

bin/yarn:
	@echo
	@echo === Installing Yarn ===
	rm -rf yarn
	mkdir -p yarn
	curl -L ${YARN_DOWNLOAD} | tar xzf - --strip-components=1 --directory yarn
	ln -f -s ../yarn/bin/yarn.js ./bin/yarn

.PHONY: clean
clean: ## Clean up all dependencies and compiled code
	rm -rf .node-local bin node_modules dist data/hash

.PHONY: build
build: install-node deps site ## Compile the website

.PHONY: site
site: ## Only make the site
	./bin/gulp build
