import { SearchRequestDto } from '@diut/nestjs-infra'

import { Branch } from 'src/domain'

export class BranchSearchRequestDto extends SearchRequestDto<Branch> {}
