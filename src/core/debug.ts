import consola from 'consola'
import { colorize } from 'consola/utils'
import { log } from '../utils'

const debugProcess: string[] = []

export function debugPush(...args: string[]) {
  debugProcess.push(...args)
}

const title = colorize('blue', ' vite-plugin-url-copy_debug ')
export function debugOutput(enabled: boolean) {
  if (!enabled) {
    return
  }
  const length = debugProcess.length
  let message = ''
  for (const [index, debugInfo] of debugProcess.entries()) {
    message += colorize('blue', debugInfo)

    if (index !== length - 1) {
      message += '\n\n'
    }
  }

  log('\n')
  consola.box({
    title,
    message,
    style: {
      padding: 1,
      borderColor: 'gray',
      borderStyle: 'rounded',
    },
  })

  debugProcess.length = 0
}
