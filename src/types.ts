import type { ColorName } from 'consola/utils'

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
  custom?: string | ((URL: string) => string)
  color?: ColorName
}

interface QRCodeOptions {
  disabled?: boolean
  /**
   * Custom any string.
   */
  custom?: string | ((URL: string) => string)
  color?: ColorName
}

export interface Options {
  copy?: CopyOptions
  qrcode?: QRCodeOptions
  disabled?: boolean
  debug?: boolean
}

export type ResolveOptions = DeepRequired<Options>
