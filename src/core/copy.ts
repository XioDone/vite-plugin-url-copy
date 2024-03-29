import { consola } from 'consola'
import { colorize } from 'consola/utils'
import type { ResolvedServerUrls } from 'vite'
import type { ResolveOptions } from '../types'
import { $catch, $sleep, log } from '../utils'
import { debugPush } from './debug'

export const onCopyWrite = (urls: ResolvedServerUrls, options: ResolveOptions) => {
  const { custom, mode, disabled, color } = options.copy
  const debug = options.debug

  if (disabled) {
    return
  }

  return $catch(async () => {
    let result = ''
    let hasCustom = false
    if (typeof custom === 'string' && custom) {
      hasCustom = true
      result = custom
    }

    if (typeof custom === 'function') {
      hasCustom = true
      result = custom(urls[mode][0])
    }

    if (!result) {
      result = urls[mode][0]
    }

    const computedMode = hasCustom ? 'cutsom' : mode

    if (debug) {
      debugPush(
        `copy: ${computedMode} - ${result}`,
        `copy: ${JSON.stringify(options.copy)}`,
      )
    }

    if (!result) {
      // Lower priority warning
      await $sleep()
      consola.warn(`url-copy: ${mode} mode URL is undefined, Please check your vite configuration.`)
      return
    }

    const clipboard = (await import('clipboardy')).default
    await clipboard.write(result)

    log(
      colorize('green', '\n  ✔ '),
      colorize(color, `·${computedMode}· already copied to clipboard - ${result} `),
    )

    return result
  }).catch(error => {
    consola.warn(`url-copy: ${error}`)
  })
}
