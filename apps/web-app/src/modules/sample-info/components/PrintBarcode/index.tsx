import { forwardRef, ReactElement, useRef, PropsWithChildren } from 'react'
import ReactToPrint from 'react-to-print'
import Grid from '@mui/material/Unstable_Grid2'

import { SingleBarcode } from '../SingleBarcode'

export interface PrintBarcodeProps extends PropsWithChildren {
  sampleId: string
  quantity?: number
  name?: string
  birthYear?: number
}

export function PrintBarcode({
  sampleId,
  quantity = 12,
  name = 'chiến',
  birthYear = 2000,
  children,
}: PrintBarcodeProps) {
  const componentRef = useRef<HTMLDivElement>(null)
  const upperText =
    name !== undefined && birthYear !== undefined
      ? `${name.split(' ').pop()?.toLocaleUpperCase() ?? ''} - ${birthYear}`
      : undefined

  return (
    <>
      <ReactToPrint
        trigger={() => children as ReactElement}
        content={() => componentRef.current}
      />
      <div style={{ display: 'none' }}>
        <PrintContent ref={componentRef}>
          <>
            {Array.from(Array(Math.ceil(quantity / 3)).keys()).map(
              (value, rowIndex) => (
                <SinglePrintRow key={rowIndex}>
                  <SingleBarcode
                    value={sampleId}
                    upperText={upperText}
                    lowerText={sampleId}
                  />
                </SinglePrintRow>
              )
            )}
          </>
        </PrintContent>
      </div>
    </>
  )
}

const PrintContent = forwardRef<HTMLDivElement, PropsWithChildren>(
  (props, ref) => {
    return <div ref={ref}>{props.children}</div>
  }
)

function SinglePrintRow({ children }: PropsWithChildren) {
  return (
    <Grid container spacing={0} sx={{ pageBreakAfter: 'always' }}>
      <Grid xs={4}>{children}</Grid>
      <Grid xs={4}>{children}</Grid>
      <Grid xs={4}>{children}</Grid>
    </Grid>
  )
}
