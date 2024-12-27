import { userRoleFactory } from './1-user'
import { urineRoleFactory } from './10-urine'
import { hcgRoleFactory } from './11-hcg'
import { papRoleFactory } from './12-pap'
import { thinprepRoleFactory } from './13-thinprep'
import { hivRoleFactory } from './14-hiv'
import { ctmRoleFactory } from './15-ctm'
import { trakqRoleFactory } from './16-trakq'
import { giaonhanRoleFactory } from './17-giaonhan'
import { managerRoleFactory } from './2-manager'
import { infoRoleFactory } from './3-info'
import { resultRoleFactory } from './4-result'
import { printRoleFactory } from './5-print'
import { sonhanmauRoleFactory } from './6-sonhanmau'
import { sinhhoaRoleFactory } from './7-sinhhoa'
import { soinhuomRoleFactory } from './8-soinhuom'
import { tddRoleFactory } from './9-tdd'

export function getDefaultRoleData(branchId: string) {
  return [
    userRoleFactory(branchId),
    managerRoleFactory(branchId),
    infoRoleFactory(branchId),
    resultRoleFactory(branchId),
    printRoleFactory(branchId),
    sonhanmauRoleFactory(branchId),
    sinhhoaRoleFactory(branchId),
    soinhuomRoleFactory(branchId),
    tddRoleFactory(branchId),
    urineRoleFactory(branchId),
    hcgRoleFactory(branchId),
    papRoleFactory(branchId),
    thinprepRoleFactory(branchId),
    hivRoleFactory(branchId),
    ctmRoleFactory(branchId),
    trakqRoleFactory(branchId),
    giaonhanRoleFactory(branchId),
  ]
}
