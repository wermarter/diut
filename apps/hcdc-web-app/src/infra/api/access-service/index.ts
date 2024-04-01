import { bioProductApi } from './bio-product'
import { branchApi } from './branch'
import { diagnosisApi } from './diagnosis'
import { doctorApi } from './doctor'
import { instrumentApi } from './instrument'
import { patientTypeApi } from './patient-type'
import { printFormApi } from './print-form'
import { sampleTypeApi } from './sample-type'
import { testApi } from './test'
import { testCategoryApi } from './test-category'
import { testComboApi } from './test-combo'

export * from './slice'

export function fetchTestCategories(branchId: string) {
  return testCategoryApi.endpoints.testCategorySearch.initiate({
    sort: { displayIndex: 1 },
    filter: { branchId },
  })
}

export function fetchTests(branchId: string) {
  return testApi.endpoints.testSearch.initiate({
    sort: { displayIndex: 1 },
    filter: { branchId },
    populates: [
      { path: 'testCategory', fields: ['name', 'displayIndex', 'reportIndex'] },
    ],
  })
}

export function fetchTestCombos(branchId: string) {
  return testComboApi.endpoints.testComboSearch.initiate({
    sort: { displayIndex: 1 },
    filter: { branchId },
  })
}

export function fetchDiagnoses(branchId: string) {
  return diagnosisApi.endpoints.diagnosisSearch.initiate({
    sort: { displayIndex: 1 },
    filter: { branchId },
  })
}

export function fetchDoctors(branchId: string) {
  return doctorApi.endpoints.doctorSearch.initiate({
    sort: { displayIndex: 1 },
    filter: { branchId },
  })
}

export function fetchPatientTypes(branchId: string) {
  return patientTypeApi.endpoints.patientTypeSearch.initiate({
    sort: { displayIndex: 1 },
    filter: { branchId },
  })
}

export function fetchBioProducts(branchId: string) {
  return bioProductApi.endpoints.bioProductSearch.initiate({
    sort: { displayIndex: 1 },
    filter: { branchId },
  })
}

export function fetchInstruments(branchId: string) {
  return instrumentApi.endpoints.instrumentSearch.initiate({
    sort: { displayIndex: 1 },
    filter: { branchId },
  })
}

export function fetchPrintForms(branchId: string) {
  return printFormApi.endpoints.printFormSearch.initiate({
    sort: { displayIndex: 1 },
    filter: { branchId },
  })
}

export function fetchSampleTypes(branchId: string) {
  return sampleTypeApi.endpoints.sampleTypeSearch.initiate({
    sort: { displayIndex: 1 },
    filter: { branchId },
  })
}

export function fetchSampleOrigins(branchIds: string[]) {
  return branchApi.endpoints.branchSearch.initiate({
    sort: { displayIndex: 1 },
    filter: {
      _id: { $in: branchIds },
    },
  })
}
