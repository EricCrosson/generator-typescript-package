# generator-typescript-package [![npm](https://img.shields.io/npm/dt/generator-typescript-package.svg)](https://www.npmjs.com/package/generator-typescript-package) [![npm version](https://img.shields.io/npm/v/generator-typescript-package.svg)](https://npmjs.org/package/generator-typescript-package)

> A [yeoman](https://github.com/yeoman) generator for [typescript](https://www.typescriptlang.org) packages with best practices

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

## Features

- supports [github](https://github.com) (for public repositories)
- supports [gitlab](https://gitlab.com) (for private repositories)
- generated documentation ([typedoc](https://typedoc.org))
- continuous integration ([travis-ci](https://travis-ci.org)/[gitlab-ci](https://docs.gitlab.com/ee/ci/))
- code coverage ([codecov](https://codecov.io))

## License

ISC © Eric Crosson
