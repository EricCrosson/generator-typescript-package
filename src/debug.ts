import { Debugger } from 'debug'

function isDebugMode(): boolean {
    return process.env.PRODUCTION === undefined
        || process.env.DEBUG !== undefined
}

function mockDebugger(tag: string): Debugger {
    function format(_formatter: any, ..._args: any[]) {}
    Object.defineProperties(
        format,
        {
            color: {
                value: ''
            },
            enabled: {
                value: false
            },
            log: {
                value: function log(..._args: any[]) {return false}
            },
            namespace: {
                value: tag
            },
            destroy: {
                value: () => true
            },
            extend: {
                value: function extend(namespace: string, delimiter?: string) {
                    return mockDebugger([tag, namespace].join(delimiter || ':'))
                }

            }
        }
    )
    return format as Debugger
}

export function debug(tag: string): Debugger {
    return isDebugMode()
        ? require('debug')(tag)
        : mockDebugger(tag)
}
