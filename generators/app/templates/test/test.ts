// Read more on testing typescript with ava
// https://github.com/avajs/ava/blob/master/docs/recipes/typescript.md

import test from 'ava'

/**
 * Library under test
 */

import { <%= camelCasePkg %> } from '../src/<%= pkg %>'

test('test ava configuration', t => {
	t.pass()
})

// TODO: write tests
