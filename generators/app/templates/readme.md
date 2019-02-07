# <%= pkg %> <% if (git_forge.includes('github.com')) { %>[![Build status](https://travis-ci.org/<%=git_group%>/<%=pkg%>.svg?branch=master)](https://travis-ci.org/<%=git_group%>/<%=pkg%>) [![npm version](https://img.shields.io/npm/v/<%=scopedPkg%>.svg)](https://npmjs.org/package/<%=scopedPkg%>) [![codecov](https://codecov.io/gh/<%=git_group%>/<%=pkg%>/branch/master/graph/badge.svg)](https://codecov.io/gh/<%=git_group%>/<%=pkg%>)<% } %>

> <%= tagline %>

## Install

``` shell
npm install <%= npm_install_from %>
```

## Use

``` typescript
import <%= camelCasePkg %> from '<%= scopedPkg %>'
// TODO: describe usage
```

## Related

TODO

## Acknowledgments

TODO
