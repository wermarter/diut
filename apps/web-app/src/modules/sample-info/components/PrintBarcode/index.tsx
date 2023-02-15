import { forwardRef, ReactElement, useRef, PropsWithChildren } from 'react'
import ReactToPrint from 'react-to-print'

import { SingleBarcode } from '../SingleBarcode'

export interface PrintBarcodeProps extends PropsWithChildren {
  quantity?: number
  name?: string
  birthYear?: number
  sampleId?: string
}

export function PrintBarcode({
  children,
  quantity = 3,
  name,
  birthYear,
  sampleId = 'oke',
}: PrintBarcodeProps) {
  const componentRef = useRef<HTMLDivElement>(null)
  const upperText = `${name} - ${birthYear}`

  return (
    <>
      <ReactToPrint
        trigger={() => children as ReactElement}
        content={() => componentRef.current}
      />
      <PrintContent ref={componentRef}>
        <>
          {new Array(Math.ceil(quantity / 3), 0).map(() => (
            <div>
              <SingleBarcode
                value={sampleId}
                upperText={upperText}
                lowerText={sampleId}
              />
              <SingleBarcode
                value={sampleId}
                upperText={upperText}
                lowerText={sampleId}
              />
              <SingleBarcode
                value={sampleId}
                upperText={upperText}
                lowerText={sampleId}
              />
            </div>
          ))}
        </>
      </PrintContent>
    </>
  )
}

const PrintContent = forwardRef<HTMLDivElement, { children: ReactElement }>(
  (props, ref) => {
    return <div ref={ref}>{props.children}</div>
  }
)
