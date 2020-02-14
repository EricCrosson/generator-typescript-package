import { docopt } from 'docopt'
import { debug } from '../debug'
import { memoize } from '../memoize'

export interface CommandLineOptions {
    lerna: boolean;
    defaultExport: boolean;
}

interface RawCommandLineOptions {
    '--lerna': boolean;
    '--default': boolean;
}


const docstring = `
Usage:
    yo typescript-package [--lerna] [--default]
`

function _parseCommandLineOptions(): CommandLineOptions {

    const rawOptions: RawCommandLineOptions = docopt(
        docstring,
        {
            help: true,
            version: null,
            exit: true
        }
    )

    const options = {
        lerna: rawOptions['--lerna'],
        defaultExport: rawOptions['--default']
    }

    debug('yo:options')('Parsed options', options)
    return options
}

export const parseCommandLineOptions = memoize(_parseCommandLineOptions)
