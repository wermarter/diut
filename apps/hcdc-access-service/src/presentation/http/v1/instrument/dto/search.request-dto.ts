import { SearchRequestDto } from '@diut/nest-core'

import { Instrument } from 'src/domain'

export class InstrumentSearchRequestDto extends SearchRequestDto<Instrument> {}
