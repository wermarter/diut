import { Instrument } from 'src/domain/entity'
import { IRepository } from './interface'

export const InstrumentRepositoryToken = Symbol('InstrumentRepository')

export interface IInstrumentRepository extends IRepository<Instrument> {}
