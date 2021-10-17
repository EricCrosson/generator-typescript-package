import Generator from "yeoman-generator";
import D from "od";
import { camelCase } from "change-case";
import { UserInput } from "./user-input";
import { licenseBadgeMarkdown } from "./licenses";

export type Path = string;

export function generatedFileName(templateFileName: string): string {
  return templateFileName
    .replace(/^.*\//, "")
    .replace(/_dot_/g, ".")
    .replace(/dot_/g, ".");
}

export function generator(
  generator: Generator,
  userInput: UserInput
): (template: Path, destination?: Path) => void {
  return function generate(template: Path, destination?: Path) {
    if (destination === undefined) {
      destination = generatedFileName(template);
    }

    generator.fs.copyTpl(
      generator.templatePath(template),
      generator.destinationPath(destination),
      {
        ...userInput,

        ...licenseBadgeMarkdown(userInput.license),

        dateYear: D.get("year", new Date()),

        exportStatement: generator.options.default ? "export default" : "export",
        importStatement: generator.options.default
          ? camelCase(userInput.packageNameKebabCase)
          : ["{", camelCase(userInput.packageNameKebabCase), "}"].join(" "),
      }
    );
  };
}
