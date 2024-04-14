import { appStore } from 'src/infra/redux'
import { fetchBranches, fetchRoles } from 'src/infra/api'
import { authSlice } from 'src/features/auth'

export const manageUserPageLoader = async () => {
  const branchId = authSlice.selectors.selectActiveBranchId(
    appStore.getState(),
  )!

  const [roleRes, branchRes] = await Promise.all([
    appStore.dispatch(fetchRoles(branchId)).unwrap(),
    appStore.dispatch(fetchBranches()).unwrap(),
  ])

  const roles = roleRes.items
  const branches = branchRes.items

  return {
    branches,
    roles,
    roleMap: new Map(roles.map((role) => [role._id, role])),
  }
}
