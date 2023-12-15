export interface Options {
  /**
   * Disable plugin.
   * @default false
   */
  disabled?: boolean
  /**
   * @default 'local'
   */
  mode?: 'local' | 'network'
  /**
   * Custom any string to copy.
   */
  custom?: string
  /**
   * Generate QR Code
   * @default false
   */
  qrcode?: boolean
  /**
   * Log config info
   */
  debug?: boolean
}
