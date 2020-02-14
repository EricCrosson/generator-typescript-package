# generator-typescript-package
[![NPM Downloads][]](https://www.npmjs.com/package/generator-typescript-package)
[![NPM Package][]](https://npmjs.org/package/generator-typescript-package)

[NPM Downloads]: https://img.shields.io/npm/dt/generator-typescript-package.svg
[NPM Package]: https://img.shields.io/npm/v/generator-typescript-package.svg

> A [yeoman] generator for [TypeScript] packages with best practices

[yeoman]: https://github.com/yeoman
[TypeScript]: https://www.typescriptlang.org

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

Generate a package in a [lerna] mono-repo. This package is expected to
be built with TypeScript 3.0's [build] mode.

[lerna]: https://github.com/RyanCavanaugh/learn-a
[build]: https://devblogs.microsoft.com/typescript/announcing-typescript-3-0/

#### default

Create a package with a single [default] export.

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

## Features

- supports [scoped] npm packages
- supports [github]
- supports [gitlab]
- supports [lerna] mono-repos
- support documentation generation with [typedoc]
- runs tests in parallel with [ava]
- continuous integration ([travis-ci]/[gitlab-ci])
- code coverage ([codecov])
- publishes only compiled JavaScript to npm
- linting with [typescript-eslint]

> Note: there has been no explicit compatibility testing for Windows
> development environments

[scoped]: https://docs.npmjs.com/about-scopes
[github]: https://github.com
[gitlab]: https://gitlab.com
[lerna]: https://github.com/lerna/lerna
[typedoc]: https://typedoc.org
[ava]: https://github.com/avajs/ava
[travis-ci]: https://travis-ci.org
[gitlab-ci]: https://docs.gitlab.com/ee/ci/
[codecov]: https://codecov.io
[typescript-eslint]: https://github.com/typescript-eslint/typescript-eslint

## License

ISC © Eric Crosson
