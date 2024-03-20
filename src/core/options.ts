import type { Options, ResolveOptions } from '../types'

export const defaultPluginOptions: ResolveOptions = {
  copy: {
    disabled: false,
    mode: 'local',
    custom: '',
    color: 'green',
  },
  qrcode: {
    disabled: true,
    custom: '',
    color: 'green',
  },
  disabled: false,
  debug: false,
}

export function resolveOptions(rawOptions: Options): ResolveOptions {
  const { disabled: rawDisabled, copy: rawCopy = {}, qrcode: rawQRCode = {}, debug: rawDebug } = rawOptions
  const { disabled, copy, qrcode, debug } = defaultPluginOptions

  return {
    copy: { ...copy, ...rawCopy },
    qrcode: { ...qrcode, ...rawQRCode },
    disabled: rawDisabled ?? disabled,
    debug: rawDebug ?? debug,
  }
}
