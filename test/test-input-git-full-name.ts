import anyTest, { TestInterface } from 'ava'
import { Nothing } from 'purify-ts'
import parse, { Config }from 'parse-git-config'

/**
 * Library under test
 */

import { gitFullName } from '../src/app/input'


interface TestContext {
    config: Config;
}

const test = anyTest as TestInterface<TestContext>;

test.before(t => {
    t.context.config = parse.sync({path: './test/res/config'})
})


test('should extract git full-name', t => {
    t.is(
        'Eric Crosson',
        gitFullName(t.context.config).extract()
    )
})

//  LocalWords:  Crosson
