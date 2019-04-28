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
yo typescript-package
```

Finally, address each `TODO:` statement in the generated project.

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

- supports [github](https://github.com) (for public repositories)
- supports [gitlab](https://gitlab.com) (for private repositories)
- generated documentation ([typedoc](https://typedoc.org))
- test in parallel with [ava](https://github.com/avajs/ava)
- continuous integration ([travis-ci](https://travis-ci.org)/[gitlab-ci](https://docs.gitlab.com/ee/ci/))
- code coverage ([codecov](https://codecov.io))
- publishes only compiled JavaScript to npm

## License

ISC © Eric Crosson
