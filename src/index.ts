import type { Plugin } from 'vite'
import type { Options } from './types'
import { $catch, $diffConfigChange, getUrls, log } from './utils'
import { onCopyWrite, onQRCode, resolveOptions } from './core'

export * from './types'

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
            await onCopyWrite(urls, options)
            onQRCode(urls, options)
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
          const urls = await getUrls(server)
          await onCopyWrite(urls, options)
          onQRCode(urls, options)
        })
      })
    },
  }
}
