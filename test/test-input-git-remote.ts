import anyTest, { TestInterface } from "ava";
import { Nothing, Just } from "purify-ts";
import parse, { Config } from "parse-git-config";

/**
 * Library under test
 */

import { gitRemote } from "../src/app/input";

interface TestContext {
  config: Config;
}

const test = anyTest as TestInterface<TestContext>;

test.before((t) => {
  t.context.config = parse.sync({ path: "./test/res/local-config" });
});

test("should extract git full-name", (t) => {
  t.is(
    "https://gitlab.com/EricCrosson/generator-typescript-package",
    gitRemote(Just(t.context.config)).extract()
  );
});

//  LocalWords:  EricCrosson
