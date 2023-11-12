export function buildBarcodeUpperText(name?: string, birthYear?: number) {
  return name !== undefined && birthYear !== undefined
    ? `${name.split(' ').pop()?.toLocaleUpperCase() ?? ''} - ${birthYear}`
    : undefined
}
