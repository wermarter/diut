import { groupBy } from 'lodash'

import { appStore } from 'src/core'
import { patientTypeApi } from 'src/api/patient-type'
import { testApi } from 'src/api/test'
import { sampleOriginApi } from 'src/api/sample-origin'

export const testReportPageLoader = async () => {
  const [patientTypes, testRes, sampleOriginRes] = await Promise.all([
    appStore
      .dispatch(
        patientTypeApi.endpoints.patientTypeSearch.initiate({
          searchPatientTypeRequestDto: { sort: { index: 1 } },
        }),
      )
      .unwrap(),
    appStore
      .dispatch(
        testApi.endpoints.testSearch.initiate({
          searchTestRequestDto: { sort: { index: 1 } },
        }),
      )
      .unwrap(),
    appStore
      .dispatch(
        sampleOriginApi.endpoints.sampleOriginSearch.initiate({
          searchSampleOriginRequestDto: { sort: { index: 1 } },
        }),
      )
      .unwrap(),
  ])

  const categories: string[] = []
  const groups = groupBy(testRes.items, (test) => {
    categories[test?.category?.index] = test?.category?.name
    return test?.category?.name
  })
  const sampleOrigins = sampleOriginRes?.items ?? []

  return {
    patientTypeMap: new Map(
      patientTypes.items.map((patientType) => [patientType._id, patientType]),
    ),
    categories: categories.filter(
      (categoryName) => typeof categoryName === 'string',
    ),
    sampleOriginMap: new Map(
      sampleOrigins.map((sampleOrigin) => [sampleOrigin._id, sampleOrigin]),
    ),
    groups,
    tests: [...testRes.items].sort((a, b) => {
      const categoryDelta = a.category.reportIndex - b.category.reportIndex
      if (categoryDelta !== 0) {
        return categoryDelta
      }
      return a.index - b.index
    }),
  }
}
