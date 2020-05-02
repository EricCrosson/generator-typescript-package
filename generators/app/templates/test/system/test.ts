import test from 'ava'

/**
 * System under test
 */

import <%= importStatement %> from '../../src/<%= packageNameKebabCase %>'

test.skip('TODO: system-test <%= packageNameKebabCase %>', t => {
    t.fail()
})
