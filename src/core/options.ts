import type { Options, ResolveOptions } from '../types'

const defaultPluginOptions: ResolveOptions = {
  copy: {
    disabled: false,
    mode: 'local',
    custom: '',
  },
  qrcode: {
    disabled: true,
    custom: '',
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
