import { SearchRequestDto } from '@diut/nest-core'

import { Branch } from 'src/domain'

export class BranchSearchRequestDto extends SearchRequestDto<Branch> {}
