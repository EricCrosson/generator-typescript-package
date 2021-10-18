# <%= packageNameKebabCase %><% if (gitHost.includes('github.com')) { %>
<%= licenseBadge %>
[![Build Status]](https://github.com/<%=gitGroup%>/<%=packageNameKebabCase%>/actions/workflows/ci.yml)
[![NPM Package]](https://npmjs.org/package/<%=scopedPackageName%>)
[![Code Coverage]](https://codecov.io/gh/<%=gitGroup%>/<%=packageNameKebabCase%>)
[![semantic-release]](https://github.com/semantic-release/semantic-release)

<%= licenseUrl %>
[Build Status]: https://github.com/<%=gitGroup%>/<%=packageNameKebabCase%>/actions/workflows/ci.yml/badge.svg
[NPM Package]: https://img.shields.io/npm/v/<%=scopedPackageName%>.svg
[Code Coverage]: https://codecov.io/gh/<%=gitGroup%>/<%=packageNameKebabCase%>/branch/master/graph/badge.svg<% } %>
[semantic-release]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg

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
