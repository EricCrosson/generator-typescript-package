import test from "ava";

/**
 * Library under test
 */

import { gitRepositoryWithoutSuffix } from "../src/app/input";

test("should act as identity for git repository url (https)", (t) => {
  const url = "https://github.com/EricCrosson/generator-typescript-package";
  t.is(url, gitRepositoryWithoutSuffix(url));
});

test(`should remove '.git' suffix from git repository url (https)`, (t) => {
  const url = "https://github.com/EricCrosson/generator-typescript-package";
  t.is(
    url,
    gitRepositoryWithoutSuffix(
      "https://github.com/EricCrosson/generator-typescript-package.git"
    )
  );
});
