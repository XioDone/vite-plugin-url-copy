export const log = console.log

const useSleep = (ms = 0) => {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

type Fn<T> = () => T | Promise<T>
/**
 * promise try catch wrap function
 * @param {Fn<T>} fn - callback function
 * @returns {Promise<T>}
 */
const useCatch = async <T>(fn: Fn<T>): Promise<T> => {
  try {
    return await fn()
  } catch (error) {
    return Promise.reject(error)
  }
}

type Resolve<T> = (value: T | PromiseLike<T>) => void
type Reject = (reason?: any) => void
interface usePromiseStateReturn<T> {
  promise: Promise<T>
  resolve: Resolve<T>
  reject: Reject
}

const usePromiseState = <T>(): usePromiseStateReturn<T> => {
  let delegator: { resolve: Resolve<T>, reject: Reject } | undefined
  const promise = new Promise<T>((resolve, reject) => {
    delegator = { resolve, reject }
  })
  if (!delegator) {
    throw new Error('usePromiseState: Delegator is not assigned.')
  }

  return { promise, ...delegator }
}

export { useSleep as $sleep, useCatch as $catch, usePromiseState as $promiseState }
