import { SearchRequestDto } from '@diut/nestjs-core'

import { Branch } from 'src/domain'

export class BranchSearchRequestDto extends SearchRequestDto<Branch> {}
