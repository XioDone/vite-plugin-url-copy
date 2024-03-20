import type { Plugin } from 'vite'
import { colorize } from 'consola/utils'
import { name, version } from '../package.json'
import type { Options } from './types'
import { $catch, $diffConfigChange, $sleep, getUrls, log } from './utils'
import { debugOutput, onCopyWrite, onQRCode, resolveOptions } from './core'

export type { Options } from './types'

/**
 * Read the {@link https://github.com/XioDone/vite-plugin-url-copy | documentation} for more details.
 */
export default function VitePluginServerUrl(rawOptions: Options = {}): Plugin {
  const options = resolveOptions(rawOptions)

  return {
    name: 'server-url-copy',
    configureServer(server) {
      if (options.disabled) {
        return
      }

      const _listen = server.listen
      const _server = server
      _server.listen = function (...args) {
        const [_port, isRestart] = args

        return $catch(async () => {
          const server = await _listen.apply(this, args)
          const urls = await getUrls(server)

          $catch(async () => {
            const port = server.config.server.port
            const hasChange = $diffConfigChange({ port, ...options })
            if (isRestart && !hasChange) {
              return
            }

            await $sleep()
            log(colorize('green', `\n ⚡${name.toLocaleUpperCase()} v${version}`))
            await onCopyWrite(urls, options)
            onQRCode(urls, options)
            debugOutput(options.debug)
          })

          return server
        })
      }
    },
    configurePreviewServer(server) {
      if (options.disabled) {
        return
      }

      server.httpServer.once('listening', () => {
        $catch(async () => {
          await $sleep()
          log(colorize('green', `\n ⚡${name.toLocaleUpperCase()} v${version}`))
          const urls = await getUrls(server)
          await onCopyWrite(urls, options)
          onQRCode(urls, options)
          debugOutput(options.debug)
        })
      })
    },
  }
}
