# <%= packageNameKebabCase %><% if (gitHost.includes('github.com')) { %>
<%= licenseBadge %>
![Build Status](https://github.com/<%=gitGroup%>/<%=packageNameKebabCase=%>/actions/workflows/ci.yml/badge.svg)
[![NPM Package][]](https://npmjs.org/package/<%=scopedPackageName%>)
[![Code Coverage][]](https://codecov.io/gh/<%=gitGroup%>/<%=packageNameKebabCase%>)

<%= licenseUrl %>
[NPM Package]: https://img.shields.io/npm/v/<%=scopedPackageName%>.svg
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
