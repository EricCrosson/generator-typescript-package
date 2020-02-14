import test from 'ava'
import { Nothing } from 'purify-ts'

/**
 * Library under test
 */

import { gitGroup } from '../src/app/input'


test('should return group-name from gitlab url (https)', t => {
    t.is(
        'strong-roots-capital',
        gitGroup('https://github.com/strong-roots-capital/parse-int-base-ten').extract()
    )
})

test('should return group-name from gitlab url (ssh)', t => {
    t.is(
        'EricCrosson',
        gitGroup('git@github.com:EricCrosson/generator-typescript-package.git').extract()
    )
})

test('should return group-name from gitlab repository url (https)', t => {
    t.is(
        'debased',
        gitGroup('https://gitlab.com/debased/debased').extract()
    )
})

test('should return group-name from gitlab repository url (ssh)', t => {
    t.is(
        'debased',
        gitGroup('git@gitlab.com:debased/debased').extract()
    )
})

test('should return Nothing when unexpected input is encountered', t => {
    t.is(
        Nothing,
        gitGroup('invalid input')
    )
})
