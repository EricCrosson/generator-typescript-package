import test from 'ava'

/**
 * Library under test
 */

import { <%= camelCasePkg %> } from '../src/<%= pkg %>'

test('test ava configuration', t => {
    t.pass()
})

test.todo('test <%= pkg %>')

// TODO: write tests
