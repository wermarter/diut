import { SearchRequestDto } from 'src/core/http-server/dtos/search-request'
import { PrintForm } from '../print-form.schema'

export class SearchPrintFormRequestDto extends SearchRequestDto<PrintForm> {}
