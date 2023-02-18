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
  value = normalizeString(value)

  return (
    <div
      style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '0.4mm' }}
    >
      <p style={{ fontSize: '2.5mm', margin: 0 }}>{upperText ?? '　'}</p>
      <Barcode
        value={value}
        displayValue={false}
        width={0.8} // 0.6
        height={25}
        margin={0}
      />
      <p style={{ fontSize: '2.7mm', marginTop: -7, marginBottom: 0 }}>
        {lowerText ?? '　'}
      </p>
    </div>
  )
}
