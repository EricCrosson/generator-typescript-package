import test, { ExecutionContext } from 'ava'

/**
 * Library under test
 */

import { generatedFileName } from '../src/app/generate'


function shouldGenerateFileName(
    t: ExecutionContext,
    templateFileName: string,
    expectedGeneratedFileName: string
) {
    t.is(
        expectedGeneratedFileName,
        generatedFileName(templateFileName)
    )
}

shouldGenerateFileName.title = function title(
    _providedTitle: string,
    template: string,
    expected: string
) {
    return `should generate file-name ${expected} from ${template}`
}


/*********************************************************************
 * Test cases
 ********************************************************************/

test(shouldGenerateFileName, 'readme.md', 'readme.md')
test(shouldGenerateFileName, 'typedoc.js', 'typedoc.js')

test(shouldGenerateFileName, 'dot_eslintrc.js', '.eslintrc.js')
test(shouldGenerateFileName, 'dot_eslintignore', '.eslintignore')
test(shouldGenerateFileName, 'dot_gitignore', '.gitignore')
test(shouldGenerateFileName, 'dot_travis.yml', '.travis.yml')
test(shouldGenerateFileName, 'dot_gitlab-ci.yml', '.gitlab-ci.yml')

test(shouldGenerateFileName, 'package_dot_json', 'package.json')

test(shouldGenerateFileName, 'tsconfig.json', 'tsconfig.json')
test(shouldGenerateFileName, 'lerna/tsconfig.json', 'tsconfig.json')

//  LocalWords:  eslintrc travis
