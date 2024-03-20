import type { PreviewServer, ViteDevServer } from 'vite'
import type { ResolveOptions } from './types'

export const log = console.log

export function isObject(value: unknown): value is Record<string, any> {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function $sleep(ms = 0) {
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
export async function $catch<T>(fn: Fn<T>): Promise<T> {
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

export function $promiseState<T>(): usePromiseStateReturn<T> {
  let delegator: { resolve: Resolve<T>, reject: Reject } | undefined
  const promise = new Promise<T>((resolve, reject) => {
    delegator = { resolve, reject }
  })
  if (!delegator) {
    throw new Error('usePromiseState: Delegator is not assigned.')
  }

  return { promise, ...delegator }
}

interface Config extends ResolveOptions {
  port?: number
}

let prevConfig = {}
export function $diffConfigChange(config: Config) {
  let hasChange = false
  function diff(curr: any, prev: any): boolean {
    for (const prop of Object.keys(curr)) {
      if (isObject(curr[prop])) {
        const hasDiff = diff(curr[prop], prev[prop])
        if (hasDiff) {
          return hasDiff
        }
      } else if (curr[prop] !== prev[prop]) {
        hasChange = true
        return hasChange
      }
    }
    return hasChange
  }
  diff(config, prevConfig)

  if (hasChange) {
    prevConfig = config
  }

  return hasChange
}

const tryTimes = 10
let counter = 0
export async function getUrls(server: ViteDevServer | PreviewServer) {
  const urls = server.resolvedUrls
  if (counter >= tryTimes) {
    throw new Error('timeout')
  }
  if (!urls) {
    counter++
    await $sleep()
    return getUrls(server)
  }
  counter = 0
  return urls
}
