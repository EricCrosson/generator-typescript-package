# generator-typescript-package [![npm](https://img.shields.io/npm/dt/generator-typescript-package.svg)](https://www.npmjs.com/package/generator-typescript-package) [![npm version](https://img.shields.io/npm/v/generator-typescript-package.svg)](https://npmjs.org/package/generator-typescript-package)

> A [yeoman](https://github.com/yeoman) generator for [TypeScript](https://www.typescriptlang.org) packages with best practices

## Install

``` shell
npm install -g generator-typescript-package
```

## Use

Create a directory for the new package, `cd` inside and generate the
package skeleton with

``` shell
yo typescript-package [--lerna] [--default]
```

Finally, address each `TODO:` statement in the generated project.

### Options

#### lerna

Generate a package in a
[lerna](https://github.com/RyanCavanaugh/learn-a) mono-repo. This
package is expected to be built with TypeScript 3.0's
[build](https://devblogs.microsoft.com/typescript/announcing-typescript-3-0/)
mode.

#### default

Create a package with a single
[default](https://www.typescriptlang.org/docs/handbook/modules.html)
export.

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

## Features

- supports [scoped](https://docs.npmjs.com/about-scopes) npm packages
- supports [github](https://github.com) (for public repositories)
- supports [gitlab](https://gitlab.com) (for private repositories)
- supports [lerna](https://github.com/lerna/lerna) mono-repos
- auto-generates documentation on git-push ([typedoc](https://typedoc.org))
- runs tests in parallel with [ava](https://github.com/avajs/ava)
- continuous integration ([travis-ci](https://travis-ci.org)/[gitlab-ci](https://docs.gitlab.com/ee/ci/))
- code coverage ([codecov](https://codecov.io))
- publishes only compiled JavaScript to npm
- linting with [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)

## License

ISC © Eric Crosson
