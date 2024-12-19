import { PropsWithChildren, ReactElement, useRef } from 'react'
import ReactToPrint from 'react-to-print'
import { SingleBarcode, SinglePrintRow } from '../SingleBarcode'

export function buildBarcodeUpperText(name?: string, birthYear?: number) {
  return name != undefined && birthYear != undefined
    ? `${name.split(' ').pop()?.toLocaleUpperCase() ?? ''} - ${birthYear}`
    : undefined
}

export interface PrintBarcodeProps extends PropsWithChildren {
  sampleId: string
  quantity?: number
  name?: string
  birthYear?: number
}

export function PrintBarcode({
  sampleId,
  quantity = 12,
  name = 'bệnh nhân',
  birthYear = 2000,
  children,
}: PrintBarcodeProps) {
  const componentRef = useRef<HTMLDivElement>(null)
  const upperText = buildBarcodeUpperText(name, birthYear)

  return (
    <>
      <ReactToPrint
        trigger={() => children as ReactElement}
        content={() => componentRef.current}
      />
      <div style={{ display: 'none' }}>
        <div ref={componentRef}>
          {Array.from(Array(Math.ceil(quantity / 3)).keys()).map(
            (value, rowIndex) => (
              <SinglePrintRow key={rowIndex}>
                <SingleBarcode
                  value={sampleId}
                  upperText={upperText}
                  lowerText={sampleId}
                />
              </SinglePrintRow>
            ),
          )}
        </div>
      </div>
    </>
  )
}
