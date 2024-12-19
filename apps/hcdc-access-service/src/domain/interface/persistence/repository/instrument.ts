import { Instrument } from '@diut/hcdc'
import { IRepository } from './interface'

export const INSTRUMENT_REPO_TOKEN = Symbol('INSTRUMENT_REPO_TOKEN')

export interface IInstrumentRepository extends IRepository<Instrument> {}
