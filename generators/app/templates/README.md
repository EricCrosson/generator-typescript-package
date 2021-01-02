# <%= packageNameKebabCase %><% if (gitHost.includes('github.com')) { %>
<%= licenseBadge %>
[![NPM Package][]](https://npmjs.org/package/<%=scopedPackageName%>)
[![Build status][]](https://travis-ci.org/<%=gitGroup%>/<%=packageNameKebabCase%>)
[![Code Coverage][]](https://codecov.io/gh/<%=gitGroup%>/<%=packageNameKebabCase%>)

<%= licenseUrl %>
[NPM Package]: https://img.shields.io/npm/v/<%=scopedPackageName%>.svg
[Build status]: https://travis-ci.org/<%=gitGroup%>/<%=packageNameKebabCase%>.svg?branch=master
[Code Coverage]: https://codecov.io/gh/<%=gitGroup%>/<%=packageNameKebabCase%>/branch/master/graph/badge.svg<% } %>

> <%- tagline %>

## Install

``` shell
npm install <%= scopedPackageName %>
```

## Use

``` typescript
import <%= importStatement %> from '<%= scopedPackageName %>'
// TODO: describe usage
```

## Related

TODO

## Acknowledgments

TODO
