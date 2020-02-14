import * as os from 'os'
import * as path from 'path'
import camelCase from 'camelcase'
import Generator from 'yeoman-generator'

import { isNonEmptyString } from '../fp'
import { UserInput } from './user-input'
import { Path, generator } from './generate'
import { parseCommandLineOptions } from './parse'
import {
    scopedPackageName,
    gitRepositoryWithoutSuffix,
    gitHost,
    gitGroup,
    gitUsername,
    gitFullName,
    gitEmail,
    gitRemote,
    globalGitConfig,
    localGitConfig
} from './input'
import {
    proprietaryLicense,
    supportedLicenses
} from './licenses'


let userInput: UserInput
let generateTemplate: (template: Path, destination?: Path) => void;


module.exports = class extends Generator {
    constructor(args: string|string[], opts: {}) {
        super(args, opts)
        this.option(
            'lerna',
            {
                description: `The generated package will be incorporated into a lerna monoepo`,
                default: false
            }
        )
        this.option(
            'default',
            {
                description: 'The generated package will use a `default` export',
                default: false
            }
        )
    }

    initializing() {
        parseCommandLineOptions()
    }

    async prompting(): Promise<void> {
        return this.prompt(
            [
                {
                    type: 'input',
                    name: 'scope',
                    message: 'npm scope',
                    default: '',
                    store: true
                }, {
                    type: 'input',
                    name: 'packageNameKebabCase',
                    message: 'Your package name (no word-breaks)',
                    default: path.basename(this.appname.replace(/ /g, '-'))  // defaults to current folder name
                }, {
                    type: 'input',
                    name: 'tagline',
                    message: 'Your project tagline',
                    default: 'Brief and fresh sentence fragment'
                }, {
                    type: 'input',
                    name: 'keywords',
                    message: 'npm keywords',
                    default: ''
                }, {
                    type: 'list',
                    name: 'license',
                    message: 'License',
                    choices: supportedLicenses
                }, {
                    type: 'input',
                    name: 'copyrightHolder',
                    message: 'Name of copyright holder',
                    default: gitFullName(globalGitConfig()).orDefault(''),
                    store: true
                }, {
                    type: 'input',
                    name: 'gitRepository',
                    message: 'Your hosted git repository (https)',
                    default: gitRemote(localGitConfig((this as any).contextRoot))
                        .orDefault(
                            [
                                `https://github.com`,
                                gitUsername(globalGitConfig()).orDefault(os.userInfo().username),
                                this.appname.replace(/ /g, '-')
                            ].join('/')
                        )
                }, {
                    type: 'input',
                    name: 'version',
                    message: 'Initial project version',
                    default: '0.0.1'
                }, {
                    type: 'input',
                    name: 'author',
                    message: 'Your name',
                    default: gitFullName(globalGitConfig()).orDefault('')
                }, {
                    type: 'input',
                    name: 'email',
                    message: 'Your email address',
                    default: gitEmail(globalGitConfig()).orDefault('')
                }
            ]
        ).then(answers => {
            userInput = {
                ...answers,

                gitRepository: gitRepositoryWithoutSuffix(answers.gitRepository),
                keywords: answers.keywords.split(/\s+/).filter(isNonEmptyString),

                scopedPackageName: scopedPackageName(answers.scope, answers.packageNameKebabCase),
                packageNameCamelCase: camelCase(answers.packageNameKebabCase),
                gitHost: gitHost(answers.gitRepository).orDefault('TODO: could not determine git host'),
                gitGroup: gitGroup(answers.gitRepository).orDefault('TODO: could not determine git group'),
                gitUsername: gitUsername(globalGitConfig()).orDefault(os.userInfo().username)
            }

            generateTemplate = generator(this, userInput)
        })
    }

    generateSimpleTemplates() {
        generateTemplate('dot_eslintignore')
        generateTemplate('dot_eslintrc.js')
        generateTemplate('package_dot_json')
        generateTemplate('readme.md')
        generateTemplate('typedoc.js')

        generateTemplate('src/src.ts', `src/${userInput.packageNameKebabCase}.ts`)
        generateTemplate('test/unit/test.ts', `test/unit/test-${userInput.packageNameKebabCase}.ts`)
        generateTemplate('test/system/test.ts', `test/system/test-${userInput.packageNameKebabCase}.ts`)
        generateTemplate('test/property/test.ts', `test/property/test-${userInput.packageNameKebabCase}.ts`)

        if (this.options.lerna) {
            generateTemplate('lerna/tsconfig.json')
        } else {
            generateTemplate('tsconfig.json')
            generateTemplate('dot_gitignore')
        }
    }

    generateGitForgeCiFile() {
        if (this.options.lerna) {
            return
        }

        switch (userInput.gitRepository) {

            case 'github.com':
                generateTemplate('dot_travis.yml')
                break

            case 'gitlab.com':
                generateTemplate('dot_gitlab-ci.yml')
                break
        }
    }

    generateLicense() {
        if (userInput.license === proprietaryLicense) {
            generateTemplate('LICENSE')
        }
    }

    addPackageJsonKeywords() {
        if (userInput.keywords.length > 0) {
            this.fs.extendJSON(
                this.destinationPath('package.json'),
                {
                    keywords: userInput.keywords
                }
            )
        }
    }

    addPackageJsonPublishConfig() {
        switch (userInput.license) {

            case proprietaryLicense:
                this.fs.extendJSON(
                    this.destinationPath('package.json'),
                    {
                        private: true
                    }
                )
                break

            default:
                if (userInput.scope.length > 0) {
                    this.fs.extendJSON(
                        this.destinationPath('package.json'),
                        {
                            publishConfig: {
                                access: 'public'
                            }
                        }
                    )
                }
                break
        }
    }

    customizeLernaPackageJson() {
        if (!this.options.lerna) {
            return
        }

        this.fs.extendJSON(
            this.destinationPath('package.json'),
            {
                scripts: {
                    compile: 'tsc -b .'
                }
            }
        )
    }

    install() {
        if (!this.options.lerna) {
            this.npmInstall()
        }
    }

    end() {
        console.log(`
Check for outdated dependencies by running:

    \`npx ncu\`

Please commit before making changes by running:

    \`git commit -m 'Initial commit'\`
`)
    }
}

//  LocalWords:  monoepo copyrightHolder gitRepository gitUsername npx ncu
//  LocalWords:  globalGitConfig packageNameKebabCase eslintrc travis
