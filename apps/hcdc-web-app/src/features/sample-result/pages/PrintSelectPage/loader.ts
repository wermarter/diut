import { appStore } from 'src/infra/redux'
import { printFormApi } from 'src/infra/api/access-service/print-form'
import { patientTypeApi } from 'src/infra/api/access-service/patient-type'
import { testApi } from 'src/infra/api/access-service/test'
import { sampleTypeApi } from 'src/infra/api/access-service/sample-type'
import { sampleOriginApi } from 'src/infra/api/access-service/sample-origin'

export const printSelectPageLoader = async () => {
  const [
    printFormRes,
    patientTypeRes,
    testRes,
    sampleTypeRes,
    sampleOriginRes,
  ] = await Promise.all([
    appStore
      .dispatch(
        printFormApi.endpoints.printFormSearch.initiate({
          searchPrintFormRequestDto: { sort: { index: 1 } },
        }),
      )
      .unwrap(),
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
          searchTestRequestDto: {
            sort: {
              category: 1,
            },
          },
        }),
      )
      .unwrap(),
    appStore
      .dispatch(
        sampleTypeApi.endpoints.sampleTypeSearch.initiate({
          searchSampleTypeRequestDto: { sort: { index: 1 } },
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

  const tests = testRes?.items ?? []
  const printForms = printFormRes?.items ?? []
  const patientTypes = patientTypeRes?.items ?? []
  const sampleTypes = sampleTypeRes?.items ?? []
  const sampleOrigins = sampleOriginRes?.items ?? []

  return {
    printForms,
    patientTypeMap: new Map(
      patientTypes.map((patientType) => [patientType._id, patientType]),
    ),
    sampleTypeMap: new Map(
      sampleTypes.map((sampleType) => [sampleType._id, sampleType]),
    ),
    tests,
    testMap: new Map(tests.map((test) => [test._id, test])),
    sampleOriginMap: new Map(
      sampleOrigins.map((sampleOrigin) => [sampleOrigin._id, sampleOrigin]),
    ),
  }
}
