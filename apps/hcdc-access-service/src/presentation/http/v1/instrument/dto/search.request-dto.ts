import { SearchRequestDto } from '@diut/nestjs-core'

import { Instrument } from 'src/domain'

export class InstrumentSearchRequestDto extends SearchRequestDto<Instrument> {}
