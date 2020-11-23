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

    initializing(): void {
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
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    generateSimpleTemplates(): void {
        generateTemplate('dot_eslintignore')
        generateTemplate('dot_eslintrc.json')
        generateTemplate('dot_prettierrc.json')
        generateTemplate('package_dot_json')
        generateTemplate('readme.md')

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

    generateGitForgeCiFile(): void {
        if (this.options.lerna) {
            return
        }

        switch (userInput.gitHost) {

            case 'github.com':
                generateTemplate('dot_travis.yml')
                break

            case 'gitlab.com':
                generateTemplate('dot_gitlab-ci.yml')
                break
        }
    }

    generateLicense(): void {
        if (userInput.license === proprietaryLicense) {
            generateTemplate('LICENSE')
        }
    }

    addPackageJsonKeywords(): void {
        if (userInput.keywords.length > 0) {
            this.fs.extendJSON(
                this.destinationPath('package.json'),
                {
                    keywords: userInput.keywords
                }
            )
        }
    }

    addPackageJsonPublishConfig(): void {
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

    customizeLernaPackageJson(): void {
        if (!this.options.lerna) {
            return
        }

        const blacklistedPackages = [
            "eslint-plugin-ava",
            "eslint-plugin-security"
        ]

        const packagejson = this.destinationPath('package.json')
        const json = this.fs.readJSON(packagejson)

        this.fs.extendJSON(
            packagejson,
            {
                scripts: {
                    compile: 'tsc -b .'
                }
            }
        )

        /* some stupid workaround */
        this.fs.extendJSON(packagejson, {devDependencies: []})
        this.fs.extendJSON(
            packagejson,
            {
                devDependencies: Object.entries(json.devDependencies)
                    .filter(([pkg, _version]) => !blacklistedPackages.includes(pkg))
                    .reduce(
                        (acc, [pkg, version]) => Object.assign(acc, {[pkg]: version}),
                        Object.create(null) as Record<string, string>
                    )
            }
        )
    }

    customizeEslintRcJson(): void {
        if (!this.options.lerna) {
            return
        }

        const blacklistedConfigs = [
            "plugin:security/recommended",
            "plugin:ava/recommended"
        ]

        const eslintrc = this.destinationPath('.eslintrc.json')
        const json = this.fs.readJSON(eslintrc)

        this.fs.extendJSON(
            eslintrc,
            {
                plugins: [
                    "@typescript-eslint"
                ],
                extends: json.extends
                    .filter((config: string) => !blacklistedConfigs.includes(config))
            }
        )
    }

    install(): void {
        if (!this.options.lerna) {
            this.npmInstall()
        }
    }

    end(): void {
        console.log(`
Check for outdated dependencies by running:

    \`npx ncu\`

Please commit before making changes by running:

    \`git add . && git commit --no-verify -m 'initial commit'\`
`)
    }
}

//  LocalWords:  monoepo copyrightHolder gitRepository gitUsername
//  LocalWords:  globalGitConfig packageNameKebabCase eslintrc travis
//  LocalWords:  prettierrc ncu npx
