import Generator from 'yeoman-generator'
import D from 'od'
import camelCase from 'camelcase'
import { now } from '../date'
import { UserInput } from './user-input'
import { licenseBadgeMarkdown } from './licenses'

export type Path = string;


export function generator(
    generator: Generator,
    userInput: UserInput
): (template: Path, destination?: Path) => void {

    const [licenseLink, licenseBadge] = licenseBadgeMarkdown(userInput.license)

    return function generate(
        template: Path,
        destination?: Path
    ) {

        if (destination === undefined) {
            destination = generatedFileName(template)
        }

        generator.fs.copyTpl(
            generator.templatePath(template),
            generator.destinationPath(destination),
            {
                ...userInput,

                licenseLink: licenseLink,
                licenseBadge: licenseBadge,

                dateYear: D.get('year', now()),

                exportStatement: generator.options.default
                    ? 'export default'
                    : 'export',
                importStatement: generator.options.default
                    ? camelCase(userInput.packageNameKebabCase)
                    : ['{', camelCase(userInput.packageNameKebabCase), '}'].join(' '),

                npm_install_from: userInput.license === 'SEE LICENSE IN <LICENSE>'
                    ? `git+ssh://git@${userInput.gitHost}/${userInput.gitGroup}/${userInput.packageNameKebabCase}`
                    : userInput.scopedPackageName
            }
        )
    }
}

export function generatedFileName(templateFileName: string): string {

    return templateFileName
        .replace(/^.*\//, '')
        .replace(/_dot_/g, '.')
        .replace(/dot_/g, '.')
}
