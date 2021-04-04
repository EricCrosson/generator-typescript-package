import { testProp, fc } from 'ava-fast-check'

/**
 * Library under test
 */

import <%= importStatement %> from '../../src/index'

testProp.skip(
    'TODO: property-test <%= packageNameKebabCase %>',
    [
        // arbitraries
        fc.nat(),
    ],
    (
        t,
        // test arguments
        natural,
    ) => {
        // ava test here
    },
    {
        verbose: true,
    },
)
