import { renderUnicodeCompact } from 'uqr'

export const generateQRCode = (URL: string) => {
  const codeData = renderUnicodeCompact(URL, {
    // Error correction level
    ecc: 'L',
    // Border width
    border: 1,
  })

  return codeData
}
