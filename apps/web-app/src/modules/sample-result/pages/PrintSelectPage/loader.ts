import { appStore } from 'src/core'
import { printFormApi } from 'src/api/print-form'
import { patientTypeApi } from 'src/api/patient-type'

export const printSelectPageLoader = async () => {
  const [printFormData, patientTypes] = await Promise.all([
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
  ])

  return {
    printFormData,
    patientTypeMap: new Map(
      patientTypes.items.map((patientType) => [patientType._id, patientType])
    ),
  }
}
