export interface Options {
  /**
   * Disabled copy.
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
   * Log config info
   */
  debug?: boolean
}
