import * as os from 'os'
import * as path from 'path'
import * as t from 'io-ts'
import Generator from 'yeoman-generator'
import { decodeDocopt, withEncode } from 'io-ts-docopt'
import { camelCase, paramCase } from 'change-case'

import { UserInput } from './user-input'
import { Path, generator } from './generate'
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
    localGitConfig,
} from './input'
import {
    proprietaryLicense,
    supportedLicenses,
} from './licenses'

const docstring = `
Usage:
    yo typescript-package [--lerna] [--bin]
`

const CommandLineOptions = withEncode(
    t.type({
        '--lerna': t.boolean,
        '--bin': t.boolean,
    }),
    a => ({
        lerna: a['--lerna'],
        bin: a['--bin'],
    }),
)

let userInput: UserInput
let generateTemplate: (template: Path, destination?: Path) => void;


module.exports = class extends Generator {
    constructor(args: string|string[], opts: Generator.GeneratorOptions) {
        super(args, opts)
        this.option(
            'lerna',
            {
                description: 'The generated package will be incorporated into a lerna monoepo',
                default: false,
                type: Boolean,
            },
        )
        this.option(
            'bin',
            {
                description: 'Provide a bin target to index.ts',
                default: false,
                type: Boolean,
            },
        )
    }

    initializing(): void {
        // Used for side-effects, throws if unsatisfied.
        // Yeoman provides access to these options
        decodeDocopt(CommandLineOptions, docstring)
    }

    async prompting(): Promise<void> {
        return this.prompt(
            [
                {
                    type: 'input',
                    name: 'scope',
                    message: 'npm scope',
                    default: '',
                    store: true,
                }, {
                    type: 'input',
                    name: 'packageNameKebabCase',
                    message: 'Your package name (no word-breaks)',
                    default: paramCase(path.basename(this.appname)),  // defaults to current folder name
                }, {
                    type: 'input',
                    name: 'tagline',
                    message: 'Your project tagline',
                    default: 'Brief and fresh sentence fragment',
                }, {
                    type: 'input',
                    name: 'keywords',
                    message: 'npm keywords',
                    default: '',
                }, {
                    type: 'list',
                    name: 'license',
                    message: 'License',
                    choices: supportedLicenses,
                }, {
                    type: 'input',
                    name: 'copyrightHolder',
                    message: 'Name of copyright holder',
                    default: gitFullName(globalGitConfig()).orDefault(''),
                    store: true,
                }, {
                    type: 'input',
                    name: 'gitRepository',
                    message: 'Your hosted git repository (https)',
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    default: gitRemote(localGitConfig((this as any).contextRoot))
                        .orDefault(
                            [
                                'https://github.com',
                                gitUsername(globalGitConfig()).orDefault(os.userInfo().username),
                                this.appname.replace(/ /g, '-'),
                            ].join('/'),
                        ),
                }, {
                    type: 'input',
                    name: 'version',
                    message: 'Initial project version',
                    default: '0.0.1',
                }, {
                    type: 'input',
                    name: 'author',
                    message: 'Your name',
                    default: gitFullName(globalGitConfig()).orDefault(''),
                }, {
                    type: 'input',
                    name: 'email',
                    message: 'Your email address',
                    default: gitEmail(globalGitConfig()).orDefault(''),
                },
            ],
        ).then(answers => {
            userInput = {
                ...answers,

                bin: this.options.bin,

                gitRepository: gitRepositoryWithoutSuffix(answers.gitRepository),
                keywords: answers.keywords.split(/\s+/).filter((str: string) => str.length > 0),

                scopedPackageName: scopedPackageName(answers.scope, answers.packageNameKebabCase),
                packageNameCamelCase: camelCase(answers.packageNameKebabCase),
                gitHost: gitHost(answers.gitRepository).orDefault('TODO: could not determine git host'),
                gitGroup: gitGroup(answers.gitRepository).orDefault('TODO: could not determine git group'),
                gitUsername: gitUsername(globalGitConfig()).orDefault(os.userInfo().username),
            }

            generateTemplate = generator(this, userInput)
        })
    }

    generateSimpleTemplates(): void {
        generateTemplate('dot_eslintignore')
        generateTemplate('dot_eslintrc.json')
        generateTemplate('package_dot_json')
        generateTemplate('README.md')

        generateTemplate('src/index.ts', 'src/index.ts')
        generateTemplate('test/unit/test.ts', `test/unit/test-${userInput.packageNameKebabCase}.ts`)
        generateTemplate('test/system/test.ts', `test/system/test-${userInput.packageNameKebabCase}.ts`)
        generateTemplate('test/property/test.ts', `test/property/test-${userInput.packageNameKebabCase}.ts`)

        if (this.options.lerna) {
            generateTemplate('lerna/tsconfig.json')
        } else {
            generateTemplate('tsconfig.json')
            generateTemplate('dot_gitignore')
            generateTemplate('dot_prettierrc.json')
            generateTemplate('dot_lintstagedrc.json')
        }

        generateTemplate('licenses/' + userInput.license.toLowerCase(), 'LICENSE')
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

    addPackageJsonKeywords(): void {
        if (userInput.keywords.length > 0) {
            this.fs.extendJSON(
                this.destinationPath('package.json'),
                {
                    keywords: userInput.keywords,
                },
            )
        }
    }

    addPackageJsonPublishConfig(): void {
        switch (userInput.license) {

            case proprietaryLicense:
                this.fs.extendJSON(
                    this.destinationPath('package.json'),
                    {
                        private: true,
                    },
                )
                break

            default:
                if (userInput.scope.length > 0) {
                    this.fs.extendJSON(
                        this.destinationPath('package.json'),
                        {
                            publishConfig: {
                                access: 'public',
                            },
                        },
                    )
                }
                break
        }
    }

    addBinTarget(): void {
        if (this.options.bin) {
            this.fs.extendJSON(
                this.destinationPath('package.json'),
                {
                    bin: {
                        [userInput.packageNameKebabCase]: './dist/src/index.js',
                    },
                },
            )
        }
    }

    customizeLernaPackageJson(): void {
        if (!this.options.lerna) {
            return
        }

        const blacklistedPackages = [
            'eslint-plugin-ava',
            'eslint-plugin-security',
        ]

        const packagejson = this.destinationPath('package.json')
        // FIXME: remove type assertion
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const json = this.fs.readJSON(packagejson) as any

        this.fs.extendJSON(
            packagejson,
            {
                scripts: {
                    prepublishOnly: 'npm run compile',
                    compile: 'tsc --build --incremental --verbose .',
                },
            },
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
                        Object.create(null) as Record<string, string>,
                    ),
            },
        )
    }

    customizeEslintRcJson(): void {
        if (!this.options.lerna) {
            return
        }

        const blacklistedConfigs = [
            'plugin:security/recommended',
            'plugin:ava/recommended',
        ]

        const eslintrc = this.destinationPath('.eslintrc.json')
        // FIXME: remove type assertion
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const json = this.fs.readJSON(eslintrc) as any

        this.fs.extendJSON(
            eslintrc,
            {
                plugins: [
                    '@typescript-eslint',
                ],
                extends: json.extends
                    .filter((config: string) => !blacklistedConfigs.includes(config)),
            },
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
//  LocalWords:  prettierrc ncu npx lintstagedrc
