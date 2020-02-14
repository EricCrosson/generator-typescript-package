import { memoize } from './memoize'

function _now(): Date {
    return new Date()
}

export const now = memoize(_now)
