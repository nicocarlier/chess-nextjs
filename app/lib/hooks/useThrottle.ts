
// export function useThrottle(callback: Function, delay:number = 100) {
export function useThrottle<T extends Function>(callback: T, delay: number = 100){
    let shouldWait = false;
    let waitingArgs: any

    const timeoutFunction = () => {
        if (waitingArgs == null){
            shouldWait = false
        } else {
            callback(...waitingArgs)
            waitingArgs = null
            setTimeout(timeoutFunction, delay)
        }
    }

    return (...args: any) => {
        if (shouldWait){
            waitingArgs = args
            return
        }

        callback(...args)
        shouldWait = true
        setTimeout(timeoutFunction, delay)
    }
}