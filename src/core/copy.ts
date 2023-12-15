import { consola } from 'consola'
import clipboard from 'clipboardy'
import { colorize } from 'consola/utils'
import type { PreviewServer, ResolvedServerUrls, ViteDevServer } from 'vite'
import type { Options } from '../types'
import { $catch, $sleep, log } from '../utils'
import { generateQRCode } from './qrcode'

const NETWORK = 'network'

export const copyWrite = (server: ViteDevServer | PreviewServer, options: Options) => {
  const { custom = '', debug = false, mode: _mode = 'local', qrcode = false } = options
  let mode = '' as typeof _mode
  if (_mode !== 'local' && _mode !== 'network') {
    mode = 'local'
  } else {
    mode = _mode
  }

  const tryTimes = 10
  let counter = 0

  async function getUrls() {
    const urls = server.resolvedUrls
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

  return $catch(async () => {
    let result = ''
    let hasCustom = false
    if (typeof custom === 'string' && custom) {
      hasCustom = true
      result = custom
    }

    const urls = await getUrls()

    if (!result) {
      result = urls[mode][0]
    }

    const computedMode = hasCustom ? 'cutsom' : mode

    if (debug) {
      log(colorize('bgYellow', '\n  Url-copy_debug: '), colorize('yellow', ` ${computedMode} - ${result} \n`))
      log(colorize('yellow', ` ${JSON.stringify(options)} \n`))
    }

    if (!result) {
      // Lower priority
      await $sleep()
      consola.warn(`Url-copy: ${mode} mode URL is undefined, Please check your vite configuration.`)
      return
    }

    await clipboard.write(result)

    log(
      colorize('green', '\n  ✔ '),
      colorize('bgGreen', ` ·${computedMode}· already copied to clipboard - ${result} `),
      '\n',
    )

    let qrcodeData: string | undefined = ''

    if (qrcode) {
      qrcodeData = getQRCode(urls)
    }

    if (qrcode && qrcodeData) {
      const url = urls[NETWORK][0]

      log(colorize('green', '\n  ✔ '), colorize('bgGreen', ` ·QRCode· of the ${NETWORK} - ${url} `), '\n')
      log(colorize('green', qrcodeData))
    }

    return result
  }).catch(error => {
    consola.warn(`Url-copy: ${error}`)
  })
}

function getQRCode(urls: ResolvedServerUrls) {
  const url = urls[NETWORK][0]

  if (!url) {
    consola.warn('Url-copy: QR-Code uses a network URL, Please check your vite configuration.')
    return
  }

  const data = generateQRCode(url)

  try {
    const dataTransformed = [...data]
      .map((item, index) => {
        if (!index) {
          item = `\t${item}`
        }

        if (item === '\n') {
          item = `${item}\t`
        }

        return item
      })
      .join('')

    return dataTransformed
  } catch (error) {
    return data
  }
}
