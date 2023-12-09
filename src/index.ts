import { consola } from 'consola'
import clipboard from 'clipboardy'
import { colorize } from 'consola/utils'
import type { Plugin, PreviewServer, ResolvedServerUrls, ViteDevServer } from 'vite'
import type { Options } from './types'
import { $catch, $sleep, log } from './utils'

export * from './types'

export default function VitePluginServerUrl(options: Options = {}): Plugin {
  return {
    name: 'server-url-copy',

    configureServer(server) {
      if (options.disabled) {
        return
      }

      server.httpServer?.once('listening', () => {
        copyWrite(server, options)
      })
    },
    configurePreviewServer(server) {
      if (options.disabled) {
        return
      }

      server.httpServer.once('listening', () => {
        copyWrite(server, options)
      })
    },
  }
}

function copyWrite(server: ViteDevServer | PreviewServer, options: Options) {
  const { custom = '', debug = false, mode: _mode = 'local' } = options
  let mode = '' as typeof _mode
  if (_mode !== 'local' && _mode !== 'network') {
    mode = 'local'
  } else {
    mode = _mode
  }

  $catch(async () => {
    let result = ''
    let hasCustom = false
    if (typeof custom === 'string' && custom) {
      hasCustom = true
      result = custom
    }

    if (!result) {
      await $sleep()
      const urls = await getUrls()
      result = urls[mode][0]
    }

    const computedMode = hasCustom ? 'cutsom' : mode

    if (debug) {
      log(colorize('bgYellow', '\n  Url-copy_debug: '), colorize('yellow', ` ${computedMode} - ${result} \n`))
      log(colorize('yellow', ` ${JSON.stringify(options)} \n`))
    }

    if (!result) {
      consola.warn(`Url-copy: ${mode} mode URL is undefined, Please check your vite configuration.`)
      return
    }

    await clipboard.write(result)

    log(
      colorize('green', '\n  ✔ '),
      colorize('bgGreen', ` ·${computedMode}· already copied to clipboard:  ${result} `),
      '\n',
    )
  }).catch(error => {
    consola.warn(`Url-copy: ${error}`)
  })

  const tryTimes = 10
  let counter = 0

  async function getUrls() {
    const urls = server.resolvedUrls as ResolvedServerUrls
    if (counter >= tryTimes) {
      throw new Error('timeout')
    }
    if (!urls) {
      counter++
      await $sleep()
      return getUrls()
    }

    return urls
  }
}
