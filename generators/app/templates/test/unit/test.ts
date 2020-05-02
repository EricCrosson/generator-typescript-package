import test from 'ava'

/**
 * Unit under test
 */

import <%= importStatement %> from '../../src/<%= packageNameKebabCase %>'

test.skip('TODO: unit-test <%= packageNameKebabCase %>', t => {
    t.fail()
})
