import { SearchRequestDto } from '@diut/nest-core'
import { PrintForm } from '../print-form.schema'

export class SearchPrintFormRequestDto extends SearchRequestDto<PrintForm> {}
