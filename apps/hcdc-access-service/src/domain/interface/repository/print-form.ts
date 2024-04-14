import { PrintForm } from '@diut/hcdc'

import { IRepository } from './interface'

export const PrintFormRepositoryToken = Symbol('PrintFormRepository')

export interface IPrintFormRepository extends IRepository<PrintForm> {}
