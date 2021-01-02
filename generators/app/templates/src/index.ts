<% if (bin) { %>#!/usr/bin/env node

<% } %>/**
 * <%= packageNameKebabCase %>
 * <%- tagline %>
 */

/**
 * TODO: document
 */
<%= exportStatement %> function <%= packageNameCamelCase %>() {
    // TODO: implement
}<% if (bin) { %>

// Local Variables:
// mode: typescript
// End:<% } %>
