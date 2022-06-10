# generator-typescript-package
[![License]](https://opensource.org/licenses/ISC)
[![Build Status]](https://github.com/EricCrosson/generator-typescript-package/actions/workflows/ci.yml)
[![NPM Package]](https://npmjs.org/package/generator-typescript-package)
[![NPM Downloads]](https://www.npmjs.com/package/generator-typescript-package)
[![Code Coverage]](https://codecov.io/gh/ericcrosson/generator-typescript-package)
[![semantic-release]](https://github.com/semantic-release/semantic-release)

[License]: https://img.shields.io/badge/License-ISC-blue.svg
[Build Status]: https://github.com/ericcrosson/generator-typescript-package/actions/workflows/ci.yml/badge.svg
[NPM Package]: https://img.shields.io/npm/v/generator-typescript-package.svg
[NPM Downloads]: https://img.shields.io/npm/dt/generator-typescript-package.svg
[Code Coverage]: https://codecov.io/gh/ericcrosson/generator-typescript-package/branch/master/graph/badge.svg
[semantic-release]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg

> An opinionated [yeoman] generator for [TypeScript] packages with best practices

NOTE: this project is on life-support, and is subject to change wildly, or not at all. Please
reach out by opening an issue if you're interested in helping or taking over maintenance of this project!

[yeoman]: https://github.com/yeoman
[TypeScript]: https://www.typescriptlang.org

## Features

- supports [scoped] npm packages
- supports [GitHub]
- supports [gitlab]
- supports [lerna] monorepos
- continuous integration ([GitHub Actions]/[gitlab-ci])
- continuous delivery (with [semantic-release])
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
[GitHub Actions]: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs-or-python
[semantic-release]: https://github.com/semantic-release/semantic-release
[ava]: https://github.com/avajs/ava
[fast-check]: https://github.com/dubzzz/fast-check
[gitlab-ci]: https://docs.gitlab.com/ee/ci/
[codecov]: https://codecov.io
[typescript-eslint]: https://github.com/typescript-eslint/typescript-eslint

## Install

``` shell
npm install -g generator-typescript-package
```

## Use

Create a directory for the new package, `cd` inside and generate the package skeleton
with

``` shell
yo typescript-package [--lerna] [--bin]
git commit -m 'Initial commit'
```

Finally, address each `TODO:` statement in the generated project.

### Options

#### lerna

> default: false

Generate a package in a [lerna] mono-repo. This package is expected to be built with
TypeScript 3.0's [build] mode.

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

## Integrations

### Continuous Integration

GitHub actions runs the `.github/workflows/ci.yml` action on every pull-request against
the `master`, `alpha`, or `beta` branch.

To configure this behavior, customize the invoked npm run-scripts or the GitHub action
itself.

### Continuous Delivery

GitHub actions runs the `.github/workflows/release.yml` action on every push to the
`master`, `alpha`, or `beta` branch.

This action uses the [semantic-release GitHub action] to create a new release and
publish to npm, which requires the `NPM_TOKEN` [Secret Variable].

Note that pushes to the `alpha` and `beta` branch [create prereleases].

[Secret Variable]: https://docs.github.com/en/actions/security-guides/encrypted-secrets
[semantic-release GitHub action]: https://github.com/semantic-release/semantic-release/blob/master/docs/recipes/ci-configurations/github-actions.md
[create prereleases]: https://github.com/semantic-release/semantic-release/blob/66cc2b4c7f60d0717ff13110a8c0d3c9f1531f4e/docs/recipes/pre-releases.md#publishing-pre-releases
