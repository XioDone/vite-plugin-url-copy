import { colorize } from 'consola/utils'
import { log } from '../utils'

const debugProcess: Function[] = []

export function debugPush(fn: Function) {
  debugProcess.push(fn)
}

export function debugOutput() {
  log('\n')
  log(colorize('bgYellow', '  vite-plugin-url-copy_debug:  '), '\n')
  for (const debugFn of debugProcess) {
    debugFn && debugFn()
  }

  debugProcess.length = 0
}
