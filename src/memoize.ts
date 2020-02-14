export function memoize<F extends (...args: any[]) => any>(f: F): F {

    const memory: Record<string, ReturnType<F>> = Object.create(null)

    return function memoized(...args: Parameters<F>): ReturnType<F> {

        const key = JSON.stringify(args)

        if (key in memory) {
            return memory[key]
        }

        const result = f(...args)
        memory[key] = result
        return result

    } as F
}
