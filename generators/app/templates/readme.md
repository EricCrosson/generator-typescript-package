# <%= pkg %> <% if (git_forge.includes('github.com')) { %>[![Build Status](https://travis-ci.org/<%=git_group%>/<%=pkg%>.svg?branch=master)](https://travis-ci.org/<%=git_group%>/<%=pkg%>) [![npm](https://img.shields.io/npm/dt/<%=pkg%>.svg)](https://www.npmjs.com/package/<%=pkg%>) [![npm version](https://img.shields.io/npm/v/<%=pkg%>.svg)](https://npmjs.org/package/<%=pkg%>)<% } %>

> <%= tagline %>

## Install

``` shell
npm install <%= npm_install_from %>
```

## Use

``` typescript
import { TODO } from '<%= pkg %>'
// TODO: describe usage
```

## RELATED

TODO

## Acknowledgments

TODO
