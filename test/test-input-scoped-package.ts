import anyTest, { TestInterface } from "ava";

/**
 * Library under test
 */

import { scopedPackageName } from "../src/app/input";

interface TestContext {
  packageNameKebabCase: string;
  scope: string;
  packageWithScope: string;
}

const test = anyTest as TestInterface<TestContext>;

/*********************************************************************
 * Test cases
 ********************************************************************/

test.before((t) => {
  t.context.packageNameKebabCase = "my-package";
  t.context.scope = "my-scope";
  t.context.packageWithScope = `@${t.context.scope}/${t.context.packageNameKebabCase}`;
});

test("should return package-name when scope is empty string", (t) => {
  t.is(
    t.context.packageNameKebabCase,
    scopedPackageName("", t.context.packageNameKebabCase)
  );
});

test("should return scoped package when scope is populated", (t) => {
  t.is(
    t.context.packageWithScope,
    scopedPackageName(t.context.scope, t.context.packageNameKebabCase)
  );
});

test(`should ignore one extra '@' in scope`, (t) => {
  t.is(
    t.context.packageWithScope,
    scopedPackageName(["@", t.context.scope].join(""), t.context.packageNameKebabCase)
  );
});

test(`should ignore two extra '@' in scope`, (t) => {
  t.is(
    t.context.packageWithScope,
    scopedPackageName(
      ["@", "@", t.context.scope].join(""),
      t.context.packageNameKebabCase
    )
  );
});

//  LocalWords:  packageNameKebabCase
