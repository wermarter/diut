import { SearchRequestDto } from '@diut/nestjs-infra'
import { Instrument } from '@diut/hcdc'

export class InstrumentSearchRequestDto extends SearchRequestDto<Instrument> {}
