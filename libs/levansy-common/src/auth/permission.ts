export enum Permission {
  Admin = 'ManageCore',
  Restricted = 'Restricted',
  //
  ManageInfo = 'ManageInfo',
  ManageResult = 'ManageResult',
  PrintResult = 'PrintResult',
  //
  ViewTestReport = 'ViewTestReport',
  //
  ExportSinhHoa = 'ExportSinhHoa',
  ExportPapSmear = 'ExportPapSmear',
  ExportThinPrep = 'ExportThinPrep',
  ExportHCG = 'ExportHCG',
  ExportUrine10 = 'ExportUrine10',
  ExportTD = 'ExportTD',
  ExportCTM = 'ExportCTM',
  ExportHIV = 'ExportHIV',
  ExportSoiNhuom = 'ExportSoiNhuom',
  //
  ExportTraKQ = 'ExportTraKQ',
  ExportGiaoNhanMau = 'ExportGiaoNhanMau',
}

export function isAdmin(userPermissions: Permission[] | undefined) {
  return userPermissions?.includes(Permission.Admin) ?? false
}

export function isRestricted(requiredPermissions: Permission[]) {
  return requiredPermissions.includes(Permission.Restricted)
}

export function checkPermissionAnyOf(
  userPermissions: Permission[] | undefined | null,
  requiredPermissions: Permission[] | undefined | null,
) {
  if (userPermissions == null) {
    return false
  }
  if (requiredPermissions == null) {
    return true
  }
  if (isRestricted(requiredPermissions)) {
    return false
  }
  if (isAdmin(userPermissions)) {
    return true
  }

  return userPermissions.some((userPermission) =>
    requiredPermissions.includes(userPermission),
  )
}

export function checkPermissionAllOf(
  userPermissions: Permission[] | undefined | null,
  requiredPermissions: Permission[] | undefined | null,
) {
  if (userPermissions == null) {
    return false
  }
  if (requiredPermissions == null) {
    return true
  }
  if (isRestricted(requiredPermissions)) {
    return false
  }
  if (isAdmin(userPermissions)) {
    return true
  }

  return requiredPermissions.every((requiredPermission) =>
    userPermissions.includes(requiredPermission),
  )
}
