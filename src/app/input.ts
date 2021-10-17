import { Maybe } from "purify-ts";
import { memoize } from "@strong-roots-capital/memoize";
import gitConfigPath from "git-config-path";
import parse, { Config as GitConfig } from "parse-git-config";
import parseGithubUrl from "parse-github-url";
import findUp from "find-up";

function globalGitConfig_(): GitConfig {
  return parse.sync({ path: gitConfigPath("global") ?? undefined });
}
export const globalGitConfig = memoize(1)(globalGitConfig_);

function localGitConfig_(root: string): Maybe<GitConfig> {
  return Maybe.fromNullable(findUp.sync(".git/config", { cwd: root })).map((path) =>
    parse.sync({ path })
  );
}
export const localGitConfig = memoize(1)(localGitConfig_);

export function gitUsername(config: GitConfig): Maybe<string> {
  const githubUsername = Maybe.fromNullable(config.github).chainNullable(
    (github) => github.user
  );

  const gitlabUsername = Maybe.fromNullable(config.gitlab).chainNullable(
    (gitlab) => gitlab.user
  );

  return githubUsername.alt(gitlabUsername);
}

export function gitFullName(config: GitConfig): Maybe<string> {
  return Maybe.fromNullable(config.user).chainNullable((user) => user.name);
}

export function gitEmail(config: GitConfig): Maybe<string> {
  return Maybe.fromNullable(config.user).chainNullable((user) => user.email);
}

export function scopedPackageName(scope: string, packageNameKebabCase: string): string {
  return scope.length > 0
    ? `@${scope}/${packageNameKebabCase}`.replace(/^@+/, "@")
    : packageNameKebabCase;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function gitRemote(config: Maybe<GitConfig>): Maybe<string> {
  return config
    .chainNullable((config) => config['remote "origin"'])
    .chainNullable((origin) => origin.url)
    .map((url) => parseGithubUrl(url))
    .map((parsed: any) => ["https://", parsed.host, "/", parsed.repo].join(""));
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export function gitRepositoryWithoutSuffix(repository: string): string {
  // DISCUSS: validating git url https://github.com/jonschlinkert/is-git-url
  return repository.replace(/.git$/, "");
}

export function gitHost(repository: string): Maybe<string> {
  return Maybe.fromNullable(
    repository.match(/.*(@|:\/\/)(.*?)(:|\/).*?\/.*?$/)
  ).chainNullable((matches) => matches[2]);
}

export function gitGroup(repository: string): Maybe<string> {
  return Maybe.fromNullable(repository.match(/.*[@/].*[:/](.*?)\/.*?$/)).chainNullable(
    (matches) => matches[1]
  );
}

//  LocalWords:  gitconfig packageNameKebabCase
