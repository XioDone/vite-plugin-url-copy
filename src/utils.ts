import type { Options } from './types'

export const log = console.log

export const $sleep = (ms = 0) => {
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
export const $catch = async <T>(fn: Fn<T>): Promise<T> => {
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

export const $promiseState = <T>(): usePromiseStateReturn<T> => {
  let delegator: { resolve: Resolve<T>, reject: Reject } | undefined
  const promise = new Promise<T>((resolve, reject) => {
    delegator = { resolve, reject }
  })
  if (!delegator) {
    throw new Error('usePromiseState: Delegator is not assigned.')
  }

  return { promise, ...delegator }
}

interface PrevConfig {
  port?: number
  mode?: 'local' | 'network'
  qrcode?: boolean
}

interface Config extends Options {
  port?: number
}

const prevConfig: PrevConfig = {
  port: undefined,
  mode: undefined,
  qrcode: undefined,
}

export const $diffConfigChange = (config: Config) => {
  let hasChange = false

  type Prop = keyof PrevConfig
  for (const prop of Object.keys(prevConfig)) {
    const _prop = prop as Prop
    if (prevConfig[_prop] !== config[_prop]) {
      hasChange = true
      prevConfig[_prop] = config[_prop] as any
    }
  }
  return hasChange
}
