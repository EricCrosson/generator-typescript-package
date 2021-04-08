include $(shell [ ! -f .mkdkr ] && curl -fsSL https://github.com/rosineygp/mkdkr/releases/latest/download/mkdkr > .mkdkr; bash .mkdkr init)

node_modules:
	@$(dkr)
	instance: node:lts
	run: npm install

lint: node_modules
	@$(dkr)
	instance: node:lts
	run: 'npm run lint || true'

test_%: node_modules
	@$(dkr)
	instance: node:$*
	run: npm run test

coverage_%:
	@$(dkr)
	instance: node:$*
	run: npm run coverage
	
deploy: node_modules
	@$(dkr)
	instance: node:lts
	run: echo  "//registry.npmjs.org/:_authToken=\$(NPM_TOKEN)" \> .npmrc
	run: npm publish
