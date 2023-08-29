export function normalizeString(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace('đ', 'd');
}

export function printBarcode(content: string, altText?: string) {
  const normalizedContent = normalizeString(content)

  let normalizedAltText: string
  if (altText != undefined) {
    normalizedAltText = normalizeString(altText)
  } else {
    normalizedAltText = normalizedContent
  }

  if (normalizedContent?.length > 0 && normalizedAltText?.length > 0) {
    window
      ?.open(
        `http://bwipjs-api.metafloor.com/?bcid=code128&text=${normalizedContent}&alttext=${normalizedAltText}&textyoffset=3`,
        '_blank'
      )
      ?.focus()
  }
}
