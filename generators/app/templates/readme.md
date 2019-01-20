# <%= pkg %> <% if (git_forge.includes('github.com')) { %>[![Build status](https://travis-ci.org/<%=git_group%>/<%=pkg%>.svg?branch=master)](https://travis-ci.org/<%=git_group%>/<%=pkg%>) [![npm version](https://img.shields.io/npm/v/<%=pkg%>.svg)](https://npmjs.org/package/<%=pkg%>) [![Code coverage](https://img.shields.io/codecov/c/<%=git_forge%>/<%=git_group%>/<%=pkg%>.svg)](https://codecov.io/gh/<%=git_group%>/<%=pkg%>)<% } %>

> <%= tagline %>

## Install

``` shell
npm install <%= npm_install_from %>
```

## Use

``` typescript
import <%= camelCasePkg %> from '<%= pkg %>'
// TODO: describe usage
```

## Related

TODO

## Acknowledgments

TODO
