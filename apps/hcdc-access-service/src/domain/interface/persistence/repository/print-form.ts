import { PrintForm } from '@diut/hcdc'
import { IRepository } from './interface'

export const PRINTFORM_REPO_TOKEN = Symbol('PRINTFORM_REPO_TOKEN')

export interface IPrintFormRepository extends IRepository<PrintForm> {}
