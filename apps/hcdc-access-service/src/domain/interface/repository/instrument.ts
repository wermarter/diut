import { Instrument } from '@diut/hcdc'

import { IRepository } from './interface'

export const InstrumentRepositoryToken = Symbol('InstrumentRepository')

export interface IInstrumentRepository extends IRepository<Instrument> {}
