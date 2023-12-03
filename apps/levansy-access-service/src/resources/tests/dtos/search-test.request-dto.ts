import { SearchRequestDto } from '@diut/nest-core'
import { Test } from '../test.schema'

export class SearchTestRequestDto extends SearchRequestDto<Test> {}
