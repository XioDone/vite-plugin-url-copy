type DeepRequired<T> = {
  [P in keyof T]-?: DeepRequired<T[P]>
}

interface CopyOptions {
  disabled?: boolean
  /**
   * @default 'local'
   */
  mode?: 'local' | 'network'
  /**
   * Custom any string.
   */
  custom?: string | undefined
}

interface QRCodeOptions {
  disabled?: boolean
  /**
   * Custom any string.
   */
  custom?: string
}

export interface Options {
  copy?: CopyOptions
  qrcode?: QRCodeOptions
  disabled?: boolean
  debug?: boolean
}

export type ResolveOptions = DeepRequired<Options>
