# generator-typescript-package
[![License][]](https://opensource.org/licenses/ISC)
![Build Status](https://github.com/ericcrosson/generator-typescript-package/actions/workflows/ci.yml/badge.svg)
[![Code Coverage][]](https://codecov.io/gh/ericcrosson/generator-typescript-package)
[![NPM Package][]](https://npmjs.org/package/generator-typescript-package)
[![NPM Downloads][]](https://www.npmjs.com/package/generator-typescript-package)

[License]: https://img.shields.io/badge/License-ISC-blue.svg
[Code Coverage]: https://codecov.io/gh/ericcrosson/generator-typescript-package/branch/master/graph/badge.svg
[NPM Package]: https://img.shields.io/npm/v/generator-typescript-package.svg
[NPM Downloads]: https://img.shields.io/npm/dt/generator-typescript-package.svg

> A [yeoman] generator for [TypeScript] packages with best practices

[yeoman]: https://github.com/yeoman
[TypeScript]: https://www.typescriptlang.org

## Features

- supports [scoped] npm packages
- supports [GitHub]
- supports [gitlab]
- supports [lerna] mono-repos
- continuous integration ([GitHub Actions]/[gitlab-ci])
- runs tests in parallel with [ava]
- property-testing with [fast-check]
- code coverage ([codecov])
- linting with [typescript-eslint]
- publishes only compiled JavaScript to npm (no typescript sources)

> Note: there has been no explicit compatibility testing for Windows
> development-environments

[scoped]: https://docs.npmjs.com/about-scopes
[GitHub]: https://github.com
[gitlab]: https://gitlab.com
[lerna]: https://github.com/lerna/lerna
[ava]: https://github.com/avajs/ava
[fast-check]: https://github.com/dubzzz/fast-check
[GitHub Actions]: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs-or-python
[gitlab-ci]: https://docs.gitlab.com/ee/ci/
[codecov]: https://codecov.io
[typescript-eslint]: https://github.com/typescript-eslint/typescript-eslint

## Install

``` shell
npm install -g generator-typescript-package
```

## Use

Create a directory for the new package, `cd` inside and generate the
package skeleton with

``` shell
yo typescript-package [--lerna] [--bin]
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

#### bin

> default: false

Define an [executable file] under the `bin` section in the `package.json`.

[executable file]: https://docs.npmjs.com/cli/v7/configuring-npm/package-json#bin

## Test

Test the generated package

``` typescript
npm test
```

## Configuring Integrations

Under construction
