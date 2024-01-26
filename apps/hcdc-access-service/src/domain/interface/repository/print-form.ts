import { PrintForm } from 'src/domain/entity'
import { IRepository } from './interface'

export const PrintFormRepositoryToken = Symbol('PrintFormRepository')

export interface IPrintFormRepository extends IRepository<PrintForm> {}
