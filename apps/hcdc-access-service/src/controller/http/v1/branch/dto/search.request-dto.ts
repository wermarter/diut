import { SearchRequestDto } from '@diut/nestjs-infra'
import { Branch } from '@diut/hcdc'

export class BranchSearchRequestDto extends SearchRequestDto<Branch> {}
