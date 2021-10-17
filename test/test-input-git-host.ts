import test from "ava";
import { Nothing } from "purify-ts";

/**
 * Library under test
 */

import { gitHost } from "../src/app/input";

test("should return host from github repository url (https)", (t) => {
  t.is(
    "github.com",
    gitHost("https://github.com/strong-roots-capital/parse-int-base-ten").extract()
  );
});

test("should return host from github repository url (ssh)", (t) => {
  t.is(
    "github.com",
    gitHost("git@github.com:EricCrosson/generator-typescript-package.git").extract()
  );
});

test("should return host from gitlab repository url (https)", (t) => {
  t.is("gitlab.com", gitHost("https://gitlab.com/debased/debased").extract());
});

test("should return host from gitlab repository url (ssh)", (t) => {
  t.is("gitlab.com", gitHost("git@gitlab.com:debased/debased").extract());
});

test("should return Nothing when unexpected input is encountered", (t) => {
  t.is(Nothing, gitHost("invalid input"));
});
