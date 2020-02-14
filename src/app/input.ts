import { Maybe } from 'purify-ts'
import { memoize } from '../memoize'
import gitConfigPath from 'git-config-path'
import parse, { Config as GitConfig } from 'parse-git-config'
import parseGithubUrl from 'parse-github-url'


function _globalGitConfig(): GitConfig {
    return parse.sync({path: gitConfigPath('global')})
}
export const globalGitConfig = memoize(_globalGitConfig)

function _localGitConfig(root: string): GitConfig {
    return parse.sync({cwd: root})
}
export const localGitConfig = memoize(_localGitConfig)


export function gitUsername(config: GitConfig): Maybe<string> {
    const githubUsername = Maybe
        .fromNullable(config.github)
        .chainNullable(github => github.user)

    const gitlabUsername = Maybe
        .fromNullable(config.gitlab)
        .chainNullable(gitlab => gitlab.user)

    return githubUsername.alt(gitlabUsername)
}

export function gitFullName(config: GitConfig): Maybe<string> {
    return Maybe.fromNullable(config.user)
        .chainNullable(user => user.name)
}

export function gitEmail(config: GitConfig): Maybe<string> {
    return Maybe.fromNullable(config.user)
        .chainNullable(user => user.email)
}

export function scopedPackageName(
    scope: string,
    packageNameKebabCase: string
): string {
    return scope.length > 0
        ? `@${scope}/${packageNameKebabCase}`.replace(/^@+/, '@')
        : packageNameKebabCase
}

export function gitRemote(config: GitConfig): Maybe<string> {
    return Maybe.fromNullable(config['remote "origin"'])
        .chainNullable(origin => origin.url)
        .map(url => parseGithubUrl(url))
        .map((parsed: any) => [
            'https://',
            parsed.host,
            '/',
            parsed.repo
        ].join(''))
}

export function gitRepositoryWithoutSuffix(repository: string): string {
    // DISCUSS: validating git url https://github.com/jonschlinkert/is-git-url
    return repository.replace(/.git$/, '')
}

export function gitHost(repository: string): Maybe<string> {
    return Maybe
        .fromNullable(repository.match(/.*(@|:\/\/)(.*?)(:|\/).*?\/.*?$/))
        .chainNullable(matches => matches[2])
}

export function gitGroup(repository: string): Maybe<string> {
    return Maybe
        .fromNullable(repository.match(/.*[@/].*[:/](.*?)\/.*?$/))
        .chainNullable(matches => matches[1])
}

//  LocalWords:  gitconfig packageNameKebabCase
