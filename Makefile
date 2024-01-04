include setting.conf
SHELL=/bin/bash
PHONY=default app-rebuild app-build app-up app-up-d app-down test-build test-up test-down view-build view-compile view-compile-minify view-watch init lint lint-fix init-doc doc-rebuild doc-generate doc-publish clean yarn-add help

.PHONY: $(PHONY)

default: app-up

app-rebuild: app-down app-build
app-build: init-xdevkit docker-compose-build-app
app-up: docker-compose-up-app
app-up-d: docker-compose-up-app-d
app-down: docker-compose-down-app

test-build: init-xdevkit docker-compose-build-test
test-up: docker-compose-up-test
test-down: docker-compose-down-test

view-build: init-xdevkit docker-compose-build-view
view-compile: docker-compose-up-view-compile
view-compile-minify: docker-compose-up-view-compile-minify
view-watch: docker-compose-up-view-watch

init: init-xdevkit

lint: docker-compose-up-lint
lint-fix: docker-compose-up-lint-fix

init-doc: init-doc-deploy-key
doc-rebuild: docker-compose-rebuild-doc
doc-generate: docker-compose-up-doc-generate
doc-publish: docker-compose-up-doc-publish

yarn-add: docker-restart-install-stop

clean: app-down test-down

help:
	@echo "Usage: make (app|test)-(rebuild|build|up|down)"
	@echo "Usage: make view-(build|compile|compile-minify|watch)"
	@echo "Usage: make doc-(rebuild|generate|publish)"
	@echo "Usage: make (init|lint|lint-fix|clean)"
	@echo "Example:"
	@echo "  make app-rebuild           # Recreate image"
	@echo "  make app-build             # Create image"
	@echo "  make app-up                # Start server"
	@echo "  make app-up-d              # Start server and detatch"
	@echo "  make app-down              # Clean app container/volume"
	@echo "------------------------------"
	@echo "  make test-build            # Recreate test image"
	@echo "  make test-up               # Start test"
	@echo "  make test-down             # Clean test container/volume"
	@echo "------------------------------"
	@echo "  make view-build            # build view compiler image"
	@echo "  make view-compile          # compile"
	@echo "  make view-compile-minify   # compile minify"
	@echo "  make view-watch            # watch"
	@echo "------------------------------"
	@echo "  make doc-rebuild     		  # Recreate image"
	@echo "  make doc-generate     		  # doc-generate"
	@echo "  make doc-publish   		    # doc-publish"
	@echo "------------------------------"
	@echo "  make init                  # Update xdevkit, common"
	@echo "------------------------------"
	@echo "  make lint     		          # lint"
	@echo "  make lint-fix 		          # lint and fix"
	@echo "------------------------------"
	@echo "  make clean                 # Clean app, test container/volume"
	@echo "------------------------------"
	@echo "  make yarn-add CONTAINER= PACKAGE=  # restart container and install package"

# init
init-xdevkit:
	#rm -rf xdevkit/*
	git config -f .gitmodules submodule.xdevkit.branch ${XDEVKIT_VERSION}
	git submodule update --remote --init --recursive
	cp ./xdevkit/common/xdevkit-setting/browserServerSetting.js ./service/staticWeb/src/view/src/js/_setting/browserServerSetting.js
	cp ./xdevkit/common/xdevkit-setting/browserServerSetting.js ./service/staticWeb/src/setting/browserServerSetting.js
	
	rm -rf ./service/staticWeb/src/xdevkit-auth-router
	cp -r ./xdevkit/common/xdevkit-auth-router ./service/staticWeb/src/
	rm -rf ./service/staticWeb/src/xdevkit-auth-router/.git
	
	cp -r ./xdevkit/common/xdevkit-view-component/src/js/_xdevkit ./service/staticWeb/src/view/src/js/_lib/
	cp -r ./xdevkit/common/xdevkit-view-component/src/ejs ./service/staticWeb/src/view/src/ejs/_xdevkit

# build
docker-compose-build-app:
	docker compose -p ${DOCKER_PROJECT_NAME}-app -f ./app/docker/docker-compose.app.yml build
docker-compose-build-test:
	docker compose -p ${DOCKER_PROJECT_NAME}-test -f ./docker/docker-compose.test.yml build
docker-compose-build-view:
	docker compose -p ${DOCKER_PROJECT_NAME}-view -f ./xdevkit/standalone/xdevkit-view-compiler/docker/docker-compose.view.yml build

# up
docker-compose-up-app:
	docker compose -p ${DOCKER_PROJECT_NAME}-app -f ./app/docker/docker-compose.app.yml up
docker-compose-up-app-d:
	docker compose -p ${DOCKER_PROJECT_NAME}-app -f ./app/docker/docker-compose.app.yml up -d
docker-compose-up-test:
	docker compose -p ${DOCKER_PROJECT_NAME}-test -f ./docker/docker-compose.test.yml down 
	docker volume rm ${DOCKER_PROJECT_NAME}_xl-client-sample-rc-redis
	docker compose -p ${DOCKER_PROJECT_NAME}-test -f ./docker/docker-compose.test.yml up --abort-on-container-exit

docker-compose-up-view-compile:
	VIEW_PATH=../../../../service/staticWeb/src/view BUILD_COMMAND="compile" docker compose -p ${DOCKER_PROJECT_NAME}-view -f ./xdevkit/standalone/xdevkit-view-compiler/docker/docker-compose.view.yml up --abort-on-container-exit
docker-compose-up-view-compile-minify:
	VIEW_PATH=../../../../service/staticWeb/src/view BUILD_COMMAND="compile-minify" docker compose -p ${DOCKER_PROJECT_NAME}-view -f ./xdevkit/standalone/xdevkit-view-compiler/docker/docker-compose.view.yml up --abort-on-container-exit
docker-compose-up-view-watch:
	VIEW_PATH=../../../../service/staticWeb/src/view BUILD_COMMAND="watch" docker compose -p ${DOCKER_PROJECT_NAME}-view -f ./xdevkit/standalone/xdevkit-view-compiler/docker/docker-compose.view.yml up --abort-on-container-exit

# down
docker-compose-down-app:
	docker compose -p ${DOCKER_PROJECT_NAME}-app -f ./app/docker/docker-compose.app.yml down --volumes
docker-compose-down-test:
	docker compose -p ${DOCKER_PROJECT_NAME}-test -f ./docker/docker-compose.test.yml down --volumes

# devtool
docker-compose-up-lint:
	SERVICE_PATH=../../../../service docker compose -p ${DOCKER_PROJECT_NAME}-lint -f ./xdevkit/standalone/xdevkit-eslint/docker/docker-compose.eslint.yml up --abort-on-container-exit
docker-compose-up-lint-fix:
	SERVICE_PATH=../../../../service FIX_OPTION="--fix" docker compose -p ${DOCKER_PROJECT_NAME}-lint -f ./xdevkit/standalone/xdevkit-eslint/docker/docker-compose.eslint.yml up --abort-on-container-exit

init-doc-deploy-key:
	mkdir -p ./secret/
	ssh-keygen -t rsa -b 4096 -f ./secret/id_rsa_deploy_key -N ""
	echo "info: register this as a deploy key at github"
	cat ./secret/id_rsa_deploy_key.pub
docker-compose-rebuild-doc:
	docker compose -p ${DOCKER_PROJECT_NAME}-doc -f ./xdevkit/standalone/xdevkit-jsdoc/docker/docker-compose.jsdoc.yml down --volumes
	docker compose -p ${DOCKER_PROJECT_NAME}-doc -f ./xdevkit/standalone/xdevkit-jsdoc/docker/docker-compose.jsdoc.yml build
docker-compose-up-doc-publish:
	SECRET_PATH=../../../../secret \
	SERVICE_PATH=../../../../service \
	JSDOC_COMMAND="generate-publish" \
	GIT_USER_NAME="${GIT_USER_NAME}" \
	GIT_USER_EMAIL="${GIT_USER_EMAIL}" \
	GIT_REPOSITORY_URL="${GIT_REPOSITORY_URL}" \
	docker compose -p ${DOCKER_PROJECT_NAME}-doc -f ./xdevkit/standalone/xdevkit-jsdoc/docker/docker-compose.jsdoc.yml up --abort-on-container-exit
docker-compose-up-doc-generate:
	SECRET_PATH=../../../../secret \
	SERVICE_PATH=../../../../service \
	JSDOC_COMMAND="generate" \
	GIT_USER_NAME="${GIT_USER_NAME}" \
	GIT_USER_EMAIL="${GIT_USER_EMAIL}" \
	GIT_REPOSITORY_URL="${GIT_REPOSITORY_URL}" \
	docker compose -p ${DOCKER_PROJECT_NAME}-doc -f ./xdevkit/standalone/xdevkit-jsdoc/docker/docker-compose.jsdoc.yml up --abort-on-container-exit

docker-restart-install-stop:
	docker restart $(CONTAINER)
	docker exec -it $(CONTAINER) /bin/bash -c "yarn add $(PACKAGE)"
	docker stop $(CONTAINER)


%:
	@echo "Target '$@' does not exist."
	@make -s help

