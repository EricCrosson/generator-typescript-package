export const proprietaryLicense = 'SEE LICENSE IN <LICENSE>'

export const supportedLicenses = [
    "ISC",
    proprietaryLicense,
    "Apache-2.0",
    "BSD-2-Clause",
    "BSD-3-Clause",
    "BSD-4-Clause",
    "GPL-2.0-only",
    "GPL-3.0-only"
] as const

export type SupportedLicense = (typeof supportedLicenses)[number]


export function licenseBadgeMarkdown(license: SupportedLicense): [string, string] {
    switch (license) {
        case "ISC":
            return [
                '[![License][]](https://opensource.org/licenses/ISC)',
                '[License]: https://img.shields.io/badge/License-ISC-blue.svg'
            ]
        case proprietaryLicense:
            return [
                '[![License][]](LICENSE)',
                '[License]: https://img.shields.io/badge/UNLICENSED-blue.svg'
            ]
        case "Apache-2.0":
            return [
                '[![License][]](https://opensource.org/licenses/Apache-2.0)',
                '[License]: https://img.shields.io/badge/License-Apache%202.0-blue.svg'
            ]
        case "BSD-2-Clause":
            return [
                '[![License][]](https://opensource.org/licenses/BSD-2-Clause)',
                '[License]: https://img.shields.io/badge/License-BSD%202--Clause-blue.svg'
            ]
        case "BSD-3-Clause":
            return [
                '[![License][]](https://opensource.org/licenses/BSD-3-Clause)',
                '[License]: https://img.shields.io/badge/License-BSD%203--Clause-blue.svg'
            ]
        case "BSD-4-Clause":
            return [
                '[![License][]](https://opensource.org/licenses/)',
                '[License]: https://img.shields.io/badge/License-BSD%204--Clause-blue.svg'
            ]
        case "GPL-2.0-only":
            return [
                '[![License][]](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)',
                '[License]: https://img.shields.io/badge/License-GPL%20v2-blue.svg'
            ]
        case "GPL-3.0-only":
            return [
                '[![License][]](https://www.gnu.org/licenses/gpl-3.0)',
                '[License]: https://img.shields.io/badge/License-GPLv3-blue.svg'
            ]
    }
}

//  LocalWords:  opensource GPLv gpl html io img
