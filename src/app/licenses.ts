export const proprietaryLicense = "UNLICENSED";

export const supportedLicenses = [
  "ISC",
  proprietaryLicense,
  "Apache-2.0",
  "BSD-2-Clause",
  "BSD-3-Clause",
  "BSD-4-Clause",
  "GPL-2.0-only",
  "GPL-3.0-only",
] as const;

export type SupportedLicense = typeof supportedLicenses[number];

export type LicenseData = {
  licenseBadge: string;
  licenseUrl: string;
};

export function licenseBadgeMarkdown(license: SupportedLicense): LicenseData {
  switch (license) {
    case "ISC":
      return {
        licenseBadge: "[![License][]](https://opensource.org/licenses/ISC)",
        licenseUrl: "[License]: https://img.shields.io/badge/License-ISC-blue.svg",
      };
    case proprietaryLicense:
      return {
        licenseBadge: "[![License][]](LICENSE)",
        licenseUrl: "[License]: https://img.shields.io/badge/UNLICENSED-blue.svg",
      };
    case "Apache-2.0":
      return {
        licenseBadge: "[![License][]](https://opensource.org/licenses/Apache-2.0)",
        licenseUrl:
          "[License]: https://img.shields.io/badge/License-Apache%202.0-blue.svg",
      };
    case "BSD-2-Clause":
      return {
        licenseBadge: "[![License][]](https://opensource.org/licenses/BSD-2-Clause)",
        licenseUrl:
          "[License]: https://img.shields.io/badge/License-BSD%202--Clause-blue.svg",
      };
    case "BSD-3-Clause":
      return {
        licenseBadge: "[![License][]](https://opensource.org/licenses/BSD-3-Clause)",
        licenseUrl:
          "[License]: https://img.shields.io/badge/License-BSD%203--Clause-blue.svg",
      };
    case "BSD-4-Clause":
      return {
        licenseBadge: "[![License][]](https://opensource.org/licenses/)",
        licenseUrl:
          "[License]: https://img.shields.io/badge/License-BSD%204--Clause-blue.svg",
      };
    case "GPL-2.0-only":
      return {
        licenseBadge:
          "[![License][]](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)",
        licenseUrl: "[License]: https://img.shields.io/badge/License-GPL%20v2-blue.svg",
      };
    case "GPL-3.0-only":
      return {
        licenseBadge: "[![License][]](https://www.gnu.org/licenses/gpl-3.0)",
        licenseUrl: "[License]: https://img.shields.io/badge/License-GPLv3-blue.svg",
      };
  }
}

//  LocalWords:  opensource GPLv gpl html io img
