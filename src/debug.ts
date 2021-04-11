import { Debugger } from 'debug'

function isDebugMode(): boolean {
    return process.env.PRODUCTION === undefined
        && process.env.DEBUG !== undefined
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function mockDebugger(tag: string): Debugger {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    function format(_formatter: any, ..._args: any[]): void {}
    Object.defineProperties(
        format,
        {
            color: {
                value: '',
            },
            enabled: {
                value: false,
            },
            log: {
                value: function log(..._args: any[]) {return false},
            },
            namespace: {
                value: tag,
            },
            destroy: {
                value: () => true,
            },
            extend: {
                value: function extend(namespace: string, delimiter?: string) {
                    return mockDebugger([tag, namespace].join(delimiter ?? ':'))
                },

            },
        },
    )
    return format as Debugger
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-var-requires */
export function debug(tag: string): Debugger {
    return isDebugMode()
        ? require('debug')(tag)
        : mockDebugger(tag)
}
/* eslint-enable @typescript-eslint/no-var-requires */
