import { appStore } from 'src/core'
import { printFormApi } from 'src/api/print-form'
import { patientTypeApi } from 'src/api/patient-type'
import { testApi } from 'src/api/test'
import { sampleTypeApi } from 'src/api/sample-type'

export const printSelectPageLoader = async () => {
  const [printFormRes, patientTypeRes, testRes, sampleTypeRes] =
    await Promise.all([
      appStore
        .dispatch(
          printFormApi.endpoints.printFormSearch.initiate({
            searchPrintFormRequestDto: { sort: { index: 1 } },
          })
        )
        .unwrap(),
      appStore
        .dispatch(
          patientTypeApi.endpoints.patientTypeSearch.initiate({
            searchPatientTypeRequestDto: { sort: { index: 1 } },
          })
        )
        .unwrap(),
      appStore
        .dispatch(
          testApi.endpoints.testSearch.initiate({
            searchTestRequestDto: {
              sort: {
                category: 1,
              },
            },
          })
        )
        .unwrap(),
      appStore
        .dispatch(
          sampleTypeApi.endpoints.sampleTypeSearch.initiate({
            searchSampleTypeRequestDto: { sort: { index: 1 } },
          })
        )
        .unwrap(),
    ])

  const tests = testRes?.items ?? []
  const printForms = printFormRes?.items ?? []
  const patientTypes = patientTypeRes?.items ?? []
  const sampleTypes = sampleTypeRes?.items ?? []

  return {
    printForms,
    patientTypeMap: new Map(
      patientTypes.map((patientType) => [patientType._id, patientType])
    ),
    sampleTypeMap: new Map(
      sampleTypes.map((sampleType) => [sampleType._id, sampleType])
    ),
    tests,
    testMap: new Map(tests.map((test) => [test._id, test])),
  }
}
