import type { Plugin } from 'vite'
import { copyWrite } from './core'
import type { Options } from './types'
import { $catch, $diffConfigChange, log } from './utils'

export * from './types'

export default function VitePluginServerUrl(options: Options = {}): Plugin {
  return {
    name: 'server-url-copy',

    configureServer(server) {
      if (options.disabled) {
        return
      }

      const _listen = server.listen

      server.listen = function (...args) {
        const [_port, isRestart] = args

        return $catch(async () => {
          const _server = await _listen.apply(this, args)

          $catch(() => {
            const port = _server.config.server.port
            const hasChange = $diffConfigChange({ port, ...options })
            if (isRestart && !hasChange) {
              return
            }
            copyWrite(_server, options)
          })

          return _server
        }).catch(err => {
          console.log(err)
          throw err
        })
      }
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
