# <%= pkg %><% if (git_forge.includes('github.com')) { %>
[![Build status][]](https://travis-ci.org/<%=git_group%>/<%=pkg%>)
[![NPM Package][]](https://npmjs.org/package/<%=scopedPkg%>)
[![Code Coverage][]](https://codecov.io/gh/<%=git_group%>/<%=pkg%>)
[![Dependencies][]](https://david-dm.org/<%=git_group%>/<%=pkg%>/status.svg)

[Build status]: https://travis-ci.org/<%=git_group%>/<%=pkg%>.svg?branch=master
[NPM Package]: https://img.shields.io/npm/v/<%=scopedPkg%>.svg
[Code Coverage]: https://codecov.io/gh/<%=git_group%>/<%=pkg%>/branch/master/graph/badge.svg
[Dependencies]: https://david-dm.org/<%=git_group%>/<%=pkg%><% } %>

> <%- tagline %>

## Install

```shell
npm install <%= npm_install_from %>
```

## Use

```typescript
import <%= importStatement %> from '<%= scopedPkg %>'
// TODO: describe usage
```

## Related

TODO

## Acknowledgments

TODO
