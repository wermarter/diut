import { PrintForm } from '@diut/hcdc'

import { IRepository } from './interface'

export const PRINTFORM_REPO_TOKEN = Symbol('PrintFormRepository')

export interface IPrintFormRepository extends IRepository<PrintForm> {}
