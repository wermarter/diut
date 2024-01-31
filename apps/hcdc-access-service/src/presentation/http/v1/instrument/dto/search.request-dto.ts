import { SearchRequestDto } from '@diut/nestjs-infra'

import { Instrument } from 'src/domain'

export class InstrumentSearchRequestDto extends SearchRequestDto<Instrument> {}
