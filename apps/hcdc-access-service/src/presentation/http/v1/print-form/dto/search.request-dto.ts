import { SearchRequestDto } from '@diut/nest-core'

import { PrintForm } from 'src/domain'

export class PrintFormSearchRequestDto extends SearchRequestDto<PrintForm> {}
