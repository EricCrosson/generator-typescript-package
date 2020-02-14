# <%= packageNameKebabCase %><% if (gitHost.includes('github.com')) { %>
[![Build status][]](https://travis-ci.org/<%=gitGroup%>/<%=packageNameKebabCase%>)
[![NPM Package][]](https://npmjs.org/package/<%=scopedPackageName%>)
[![Code Coverage][]](https://codecov.io/gh/<%=gitGroup%>/<%=packageNameKebabCase%>)
[![Dependencies][]](https://david-dm.org/<%=gitGroup%>/<%=packageNameKebabCase%>/status.svg)

[Build status]: https://travis-ci.org/<%=gitGroup%>/<%=packageNameKebabCase%>.svg?branch=master
[NPM Package]: https://img.shields.io/npm/v/<%=scopedPackageName%>.svg
[Code Coverage]: https://codecov.io/gh/<%=gitGroup%>/<%=packageNameKebabCase%>/branch/master/graph/badge.svg
[Dependencies]: https://david-dm.org/<%=gitGroup%>/<%=packageNameKebabCase%><% } %>

> <%- tagline %>

## Install

```shell
npm install <%= npm_install_from %>
```

## Use

```typescript
import <%= importStatement %> from '<%= scopedPackageName %>'
// TODO: describe usage
```

## Documentation

See [generated documentation](doc/README.md).

## Related

TODO

## Acknowledgments

TODO
