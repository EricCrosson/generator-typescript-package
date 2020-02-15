# <%= packageNameKebabCase %><% if (gitHost.includes('github.com')) { %>
<%=licenseLink%>
[![NPM Package][]](https://npmjs.org/package/<%=scopedPackageName%>)
[![Build status][]](https://travis-ci.org/<%=gitGroup%>/<%=packageNameKebabCase%>)
[![Code Coverage][]](https://codecov.io/gh/<%=gitGroup%>/<%=packageNameKebabCase%>)
[![Dependencies][]](https://david-dm.org/<%=gitGroup%>/<%=packageNameKebabCase%>/status.svg)

<%=licenseBadge%>
[NPM Package]: https://img.shields.io/npm/v/<%=scopedPackageName%>.svg
[Build status]: https://travis-ci.org/<%=gitGroup%>/<%=packageNameKebabCase%>.svg?branch=master
[Code Coverage]: https://codecov.io/gh/<%=gitGroup%>/<%=packageNameKebabCase%>/branch/master/graph/badge.svg
[Dependencies]: https://david-dm.org/<%=gitGroup%>/<%=packageNameKebabCase%><% } %>

> <%- tagline %>

## Install

```shell
npm install <%= npmInstallFrom %>
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
