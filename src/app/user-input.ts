import { SupportedLicense } from "./licenses";

export interface UserInput {
  /* Directly prompted */
  scope: string;
  packageNameKebabCase: string;
  tagline: string;
  keywords: string[];
  license: SupportedLicense;
  copyrightHolder: string;
  gitRepository: string;
  version: string;
  author: string;
  email: string;

  /* Derived */
  scopedPackageName: string;
  packageNameCamelCase: string;
  gitHost: string;
  gitGroup: string;
  gitUsername: string;
}
