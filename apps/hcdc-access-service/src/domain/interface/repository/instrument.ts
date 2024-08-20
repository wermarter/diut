import { Instrument } from '@diut/hcdc'

import { IRepository } from './interface'

export const INSTRUMENT_REPO_TOKEN = Symbol('InstrumentRepository')

export interface IInstrumentRepository extends IRepository<Instrument> {}
