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

var input

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts)
        this.option("lerna")
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
            choices: ["ISC", "SEE LICENSE IN <LICENSE>", "Apache-2.0",
                      "BSD-2-Clause", "BSD-3-Clause", "BSD-4-Clause",
                      "GPL-2.0-only", "GPL-2.0-or-later",
                      "GPL-3.0-only", "GPL-3.0-or-later"]
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


    createTypedocJs() {
        this.fs.copyTpl(
            this.templatePath('typedoc.js'),
            this.destinationPath('typedoc.js'),
            { pkg: input.pkg })
    }

    createGitIgnore() {
        if (!this.options.lerna) {
            this.fs.copyTpl(
                this.templatePath('dot_gitignore'),
                this.destinationPath('.gitignore'),
                {})
        }
    }

    createLicense() {
        if (input.license === "SEE LICENSE IN <LICENSE>") {
            this.fs.copyTpl(
                this.templatePath('LICENSE'),
                this.destinationPath('LICENSE'),
                {
                    date_year: date_year,
                    copyright_holder: input.copyright_holder
                })
        }
    }

    createTsconfigJson() {
        this.fs.copyTpl(
            this.templatePath('tsconfig.json'),
            this.destinationPath('tsconfig.json'),
            {})
    }

    // createNodemonJson() {
    //     this.fs.copyTpl(
    //         this.templatePath('nodemon.json'),
    //         this.destinationPath('nodemon.json'),
    //         {})
    // }

    createGitForgeCIFile() {
        if (!this.options.lerna) {
            if (input.git_repository.includes('github.com')) {
                this.fs.copyTpl(
                    this.templatePath('.travis.yml'),
                    this.destinationPath('.travis.yml'),
                    {})
            } else if (input.git_repository.includes('gitlab.com')) {
                this.fs.copyTpl(
                    this.templatePath('.gitlab-ci.yml'),
                    this.destinationPath('.gitlab-ci.yml'),
                    {})
            }
        }
    }

    createPackageJson() {
        this.fs.copyTpl(
            this.templatePath('package_json'),
            this.destinationPath('package.json'),
            {
                pkg: input.pkg,
                scopedPkg: input.scopedPkg,
                version: input.version,
                tagline: input.tagline,
                git_repository: input.git_repository,
                email: input.email,
                author: input.author,
                git_username: input.git_username,
                git_forge: input.git_forge,
                license: input.license
            })
    }

    extendPackageJson() {
        if (input.license === 'SEE LICENSE IN <LICENSE>') {
            let pkgJsonExtension =
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
        if (this.options.lerna) {
            this.fs.extendJSON(this.destinationPath('package.json'), {
                scripts: {
                    install: 'tsc'
                }
            })
        }
        this.fs.extendJSON(this.destinationPath('package.json'), {
            keywords: input.keywords
        })
    }

    createReadmeAbstract() {
        this.fs.copyTpl(
            this.templatePath('readme.md'),
            this.destinationPath('readme.md'),
            {
                camelCasePkg: camelCase(input.pkg),
                pkg: input.pkg,
                scopedPkg: input.scopedPkg,
                tagline: input.tagline,
                git_group: input.git_group,
                git_forge: input.git_forge,
                npm_install_from: input.license === 'SEE LICENSE IN <LICENSE>'
                    ? `git+ssh://git@${input.git_forge}/${input.git_group}/${input.pkg}`
                    : input.scopedPkg
            })
    }

    createSrcTypescript() {
        this.fs.copyTpl(
            this.templatePath('src/src.ts'),
            this.destinationPath(`src/${input.pkg}.ts`),
            {
                date_year: date_year,
                copyright_holder: input.copyright_holder,
                tagline: input.tagline,
                pkg: input.pkg,
                camelCasePkg: camelCase(input.pkg)
            })
    }

    createTest() {
        this.fs.copyTpl(
            this.templatePath('test/test.ts'),
            this.destinationPath(`test/test-${input.pkg}.ts`),
            {
                camelCasePkg: camelCase(input.pkg),
                pkg: input.pkg
            })
    }

    install() {
        this.npmInstall()
    }
}
