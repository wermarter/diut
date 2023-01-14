import { Sample } from 'src/resources/samples/sample.schema'

/**
 * Sort sampleId by each date regardless of time
 */
export function cringySort(samples: Sample[]) {
  return [...samples].sort((sampleA, sampleB) => {
    const dateA = new Date(sampleA.infoAt).setHours(0, 0, 0, 0)
    const dateB = new Date(sampleB.infoAt).setHours(0, 0, 0, 0)
    const dateDelta = dateA - dateB

    if (dateDelta !== 0) {
      return dateDelta
    }

    return parseInt(sampleA.sampleId) - parseInt(sampleB.sampleId)
  })
}
