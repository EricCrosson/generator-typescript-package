# generator-typescript-package
[![License][]](https://opensource.org/licenses/ISC)
[![Build status][]](https://travis-ci.org/ericcrosson/generator-typescript-package)
[![Code Coverage][]](https://codecov.io/gh/ericcrosson/generator-typescript-package)
[![NPM Package][]](https://npmjs.org/package/generator-typescript-package)
[![NPM Downloads][]](https://www.npmjs.com/package/generator-typescript-package)

[License]: https://img.shields.io/badge/License-ISC-blue.svg
[Build status]: https://travis-ci.org/ericcrosson/generator-typescript-package.svg?branch=master
[Code Coverage]: https://codecov.io/gh/ericcrosson/generator-typescript-package/branch/master/graph/badge.svg
[NPM Package]: https://img.shields.io/npm/v/generator-typescript-package.svg
[NPM Downloads]: https://img.shields.io/npm/dt/generator-typescript-package.svg

> A [yeoman] generator for [TypeScript] packages with best practices

[yeoman]: https://github.com/yeoman
[TypeScript]: https://www.typescriptlang.org

## Features

- supports [scoped] npm packages
- supports [github]
- supports [gitlab]
- supports [lerna] mono-repos
- support documentation generation with [typedoc]
- continuous integration ([travis-ci]/[gitlab-ci])
- runs tests in parallel with [ava]
- property-testing with [fast-check]
- code coverage ([codecov])
- linting with [typescript-eslint]
- publishes only compiled JavaScript to npm (no typescript sources)
- automatic deploys to NPM [if configured]

> Note: there has been no explicit compatibility testing for Windows
> development-environments

[scoped]: https://docs.npmjs.com/about-scopes
[github]: https://github.com
[gitlab]: https://gitlab.com
[lerna]: https://github.com/lerna/lerna
[typedoc]: https://typedoc.org
[ava]: https://github.com/avajs/ava
[fast-check]: https://github.com/dubzzz/fast-check
[travis-ci]: https://travis-ci.org
[gitlab-ci]: https://docs.gitlab.com/ee/ci/
[codecov]: https://codecov.io
[typescript-eslint]: https://github.com/typescript-eslint/typescript-eslint
[if configured]: #Travis-CI-Deploys-to-NPM

## Install

``` shell
npm install -g generator-typescript-package
```

## Use

Create a directory for the new package, `cd` inside and generate the
package skeleton with

``` shell
yo typescript-package [--lerna] [--default]
git commit -m 'Initial commit'
```

Finally, address each `TODO:` statement in the generated project.

### Options

#### lerna

> default: false

Generate a package in a [lerna] mono-repo. This package is expected to
be built with TypeScript 3.0's [build] mode.

[lerna]: https://github.com/RyanCavanaugh/learn-a
[build]: https://devblogs.microsoft.com/typescript/announcing-typescript-3-0/

#### default

> default: false

Create a package with a single [default]-export, as opposed to a
named-export.

[default]: https://www.typescriptlang.org/docs/handbook/modules.html

## Test

Test the generated package

``` typescript
npm test
```

Or use watch-mode and run tests when files are modified

``` typescript
npm run watch:ava
npm run watch:ava:fail-fast  # stops printing on first test-failure
```

## Configuring Integrations

### Travis CI

> Supports: GitHub repositories

Just [enable] Travis CI for your new github repository and on each push
ci will run automatically.

[enable]: https://travis-ci.org/account/repositories

### Travis CI Deploys to NPM

> Supports: GitHub repositories

The generated [travis.yml] file will [automatically deploy] your package to NPM,
if configured with an NPM auth-token, on builds meeting the following criteria:

- travis-ci is building a commit to the master branch
- the commit includes a git tag (which is added automatically by `npm version`)
- travis-ci is not building a pull-request commit
- travis-ci environment variable `NPM_AUTH_TOKEN` has been defined

All you have to do to enable this feature is [define the variable]
`NPM_AUTH_TOKEN` in Travis CI's repository settings.

A compatible workflow could then look like

1. develop changes on a feature-branch
2. commit changes
3. use `npm version` to bump version
4. push feature-branch
5. open a pull-request to master
6. approve the pull-request after ci passes

> Note: if `NPM_AUTH_TOKEN` is not defined ci will skip the deploy stage
> without breaking

[travis.yml]: /generators/app/templates/dot_travis.yml
[define the variable]: https://docs.travis-ci.com/user/environment-variables/#defining-variables-in-repository-settings
[automatically deploy]: https://docs.travis-ci.com/user/deployment/npm/
