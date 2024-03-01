import { appStore } from 'src/infra/redux'
import { testApi } from 'src/infra/api/access-service/test'
import { authSlice } from 'src/features/auth'

export const manageTestElemenentPageLoader = async () => {
  const branchId = authSlice.selectors.selectActiveBranchId(appStore.getState())

  const [testRes] = await Promise.all([
    appStore
      .dispatch(
        testApi.endpoints.testSearch.initiate({
          sort: { displayIndex: 1 },
          filter: { branchId },
          populates: [
            { path: 'testCategory', fields: ['name', 'displayIndex'] },
          ],
        }),
      )
      .unwrap(),
  ])

  return {
    tests: testRes.items.toSorted(
      (a, b) =>
        (a.testCategory?.displayIndex ?? 0) -
        (b.testCategory?.displayIndex ?? 0),
    ),
  }
}
