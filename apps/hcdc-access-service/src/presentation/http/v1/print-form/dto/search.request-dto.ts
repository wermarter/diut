import { SearchRequestDto } from '@diut/nestjs-infra'

import { PrintForm } from 'src/domain'

export class PrintFormSearchRequestDto extends SearchRequestDto<PrintForm> {}
