import { testProp, fc } from 'ava-fast-check'

/**
 * Library under test
 */

import <%= importStatement %> from '../../src/<%= packageNameKebabCase %>'

testProp.skip(
    'TODO: property-test <%= packageNameKebabCase %>',
    [
        // arbitraries
    ],
    (
        // test arguments
    ) => {
        // return assertion
    }, {
        verbose: true,
        numRuns: 100
    }
)
