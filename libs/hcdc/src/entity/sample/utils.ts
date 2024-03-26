import { Sample } from './entity'

/**
 * Sort sampleId by each date regardless of time
 */
export function cringySortCompareFn(sampleA: Sample, sampleB: Sample) {
  const dateA = new Date(sampleA.infoAt).setHours(0, 0, 0, 0)
  const dateB = new Date(sampleB.infoAt).setHours(0, 0, 0, 0)
  const dateDelta = dateA - dateB

  if (dateDelta !== 0) {
    return dateDelta
  }

  return parseInt(sampleA.sampleId) - parseInt(sampleB.sampleId)
}
