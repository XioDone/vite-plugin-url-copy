import type { ResolvedServerUrls } from 'vite'
import { renderUnicodeCompact } from 'uqr'
import consola from 'consola'
import { colorize } from 'consola/utils'
import { NETWORK } from '../constants'
import { log } from '../utils'
import type { ResolveOptions } from '../types'
import { debugPush } from './debug'

export const onQRCode = (urls: ResolvedServerUrls, options: ResolveOptions) => {
  const { custom, disabled, color } = options.qrcode
  const debug = options.debug

  if (disabled) {
    return
  }

  let result = ''
  let hasCustom = false
  if (typeof custom === 'string' && custom) {
    hasCustom = true
    result = custom
  }

  if (typeof custom === 'function') {
    hasCustom = true
    result = custom(urls[NETWORK][0])
  }

  result ||= urls[NETWORK][0]
  const computedMode = hasCustom ? 'cutsom' : NETWORK

  if (debug) {
    debugPush(
      `qrcode: ${computedMode} - ${result}`,
      `qrcode: ${JSON.stringify(options.copy)}`,
    )
  }

  if (!result) {
    consola.warn('url-copy: QR-Code uses a network URL, Please check your vite configuration.')
    return
  }

  const data = generateQRCode(result)
  let qrcodeData = ''

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

    qrcodeData = dataTransformed
  } catch (error) {
    qrcodeData = data
  }

  log(colorize('green', '\n  ✔ '), colorize(color, `·QRCode· of the ${NETWORK} - ${result} `), '\n')
  log(colorize(color, qrcodeData))
}

export function generateQRCode(URL: string) {
  const codeData = renderUnicodeCompact(URL, {
    // Error correction level
    ecc: 'L',
    // Border width
    border: 1,
  })

  return codeData
}
