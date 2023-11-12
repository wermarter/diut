import { SearchRequestDto } from '@diut/server-core'
import { PrintForm } from '../print-form.schema'

export class SearchPrintFormRequestDto extends SearchRequestDto<PrintForm> {}
