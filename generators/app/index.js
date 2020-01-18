const Generator = require('yeoman-generator')
const os = require('os')
const path = require('path')
const parse = require('parse-git-config')
const camelCase = require('camelcase')

const now = new Date()
const date_year = now.getFullYear()

const git_config = parse.sync({path: `${os.homedir()}/.gitconfig`})
const git_username = (git_config.github || {}).user || os.userInfo().username
const git_full_name = git_config.user.name
const git_email = git_config.user.email

const supportedLicenses = [
    "ISC",
    "SEE LICENSE IN <LICENSE>",
    "Apache-2.0",
    "BSD-2-Clause",
    "BSD-3-Clause",
    "BSD-4-Clause",
    "GPL-2.0-only",
    "GPL-2.0-or-later",
    "GPL-3.0-only",
    "GPL-3.0-or-later"
]
const proprietaryLicense = 'SEE LICENSE IN <LICENSE>'

var input

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts)
        this.option('lerna')
        this.option('default')

        this.generate = function (template, destination = template) {
            this.fs.copyTpl(
                this.templatePath(template),
                this.destinationPath(destination),
                {
                    date_year: date_year,
                    exportStatement: this.options.default ? 'export default' : 'export',
                    importStatement: this.options.default ? camelCase(input.pkg) : `{ ${camelCase(input.pkg)} }`,

                    author: input.author,
                    camelCasePkg: camelCase(input.pkg),
                    copyright_holder: input.copyright_holder,
                    email: input.email,
                    git_forge: input.git_forge,
                    git_group: input.git_group,
                    git_repository: input.git_repository,
                    git_username: input.git_username,
                    license: input.license,
                    pkg: input.pkg,
                    scopedPkg: input.scopedPkg,
                    tagline: input.tagline,
                    version: input.version,

                    npm_install_from: input.license === 'SEE LICENSE IN <LICENSE>'
                        ? `git+ssh://git@${input.git_forge}/${input.git_group}/${input.pkg}`
                        : input.scopedPkg
                }
            )
        }
    }

    prompting() {
        return this.prompt([{
            type: 'input',
            name: 'scope',
            message: 'npm scope',
            default: '',
            store: true
        }, {
            type: 'input',
            name: 'pkg',
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
            message: 'npm keywords'
        }, {
            type: 'list',
            name: 'license',
            message: 'License',
            choices: supportedLicenses
        }, {
            type: 'input',
            name: 'copyright_holder',
            message: 'Name of copyright holder',
            default: git_full_name,
            store: true
        }, {
            type: 'input',
            name: 'git_repository',
            message: 'Your hosted git repository (https)',
            default: `https://github.com/${git_username}/${this.appname.replace(/ /g, '-')}`
        }, {
            type: 'input',
            name: 'version',
            message: 'Initial project version',
            default: '0.0.1'
        }, {
            type: 'input',
            name: 'author',
            message: 'Your name',
            default: git_full_name
        }, {
            type: 'input',
            name: 'email',
            message: 'Your email address',
            default: git_email
        }]).then(answers => {
            input = answers
            input.scopedPkg = answers.scope.length > 0
                ? `@${answers.scope}/${answers.pkg}`.replace('@@', '@')
                : answers.pkg
            input.git_repository = answers.git_repository.replace(/.git$/, '')
            input.keywords = answers.keywords.split(/\s+/)
            input.git_forge = answers.git_repository.match(/.*(@|:\/\/)(.*?)(:|\/).*?\/.*?$/)[2]
            input.git_group = answers.git_repository.match(/.*[@/].*[:/](.*?)\/.*?$/)[1]
            input.git_username = answers.git_repository.split('/').slice(-2)[0]
        })
    }

    installSimpleTemplates() {
        this.generate('readme.md')
        this.generate('src/src.ts', `src/${input.pkg}.ts`)
        this.generate('test/test.ts', `test/test-${input.pkg}.ts`)
        this.generate('.eslintrc.js')
        this.generate('.eslintignore')

        this.generate('typedoc.js')

        if (this.options.lerna) {
            this.generate('lerna/package_json', 'package.json')
            this.generate('lerna/tsconfig.json', 'tsconfig.json')
        } else {
            this.generate('package_json', 'package.json')
            this.generate('tsconfig.json')
            this.generate('dot_gitignore', '.gitignore')
            this._createGitForgeCiFile()
        }
    }

    _createGitForgeCiFile() {
        if (input.git_repository.includes('github.com')) {
            this.generate('.travis.yml')
        } else if (input.git_repository.includes('gitlab.com')) {
            this.generate('.gitlab-ci.yml')
        }
    }

    addKeywordsToPackageJson() {
        this.fs.extendJSON(this.destinationPath('package.json'), {
            keywords: input.keywords.filter(keyword => keyword !== '')
        })
    }

    addPublishConfigToPackageJson() {
        if (input.license === proprietaryLicense) {
            this.fs.extendJSON(this.destinationPath('package.json'), {
                private: true
            })
        } else if (input.scope.length > 0) {
            this.fs.extendJSON(this.destinationPath('package.json'), {
                publishConfig: {
                    access: 'public'
                }
            })
        }
    }

    createLicense() {
        if (input.license === proprietaryLicense) {
            this.generate('LICENSE')
        }
    }

    install() {
        if (!this.options.lerna) {
            this.npmInstall()
        }
    }

    end() {
        console.log(`Please run

    git commit -m 'Initial commit'
`)
    }
}
