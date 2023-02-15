import Barcode from 'react-barcode'

import { normalizeString } from 'src/common/utils'

export interface SingleBarcodeProps {
  value: string
  upperText?: string
  lowerText?: string
}

export function SingleBarcode({
  upperText,
  lowerText,
  value,
}: SingleBarcodeProps) {
  upperText = upperText && normalizeString(upperText)
  lowerText = lowerText && normalizeString(lowerText)
  value = normalizeString(value)

  return (
    <div>
      {upperText}
      <Barcode value={value} />
      OJDOJIVJFIVJ
      {lowerText}
    </div>
  )
}
