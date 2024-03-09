import { appStore } from 'src/infra/redux'
import { authSlice } from 'src/features/auth'
import { fetchTests } from 'src/infra/api'

export const manageTestElementPageLoader = async () => {
  const branchId = authSlice.selectors.selectActiveBranchId(
    appStore.getState(),
  )!

  const [testRes] = await Promise.all([
    appStore.dispatch(fetchTests(branchId)).unwrap(),
  ])

  return {
    tests: testRes.items.toSorted(
      (a, b) =>
        (a.testCategory?.displayIndex ?? 0) -
        (b.testCategory?.displayIndex ?? 0),
    ),
  }
}
