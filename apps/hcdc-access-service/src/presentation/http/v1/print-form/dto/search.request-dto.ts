import { SearchRequestDto } from '@diut/nestjs-core'

import { PrintForm } from 'src/domain'

export class PrintFormSearchRequestDto extends SearchRequestDto<PrintForm> {}
