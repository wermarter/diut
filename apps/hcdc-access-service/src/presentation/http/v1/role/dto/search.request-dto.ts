import { SearchRequestDto } from '@diut/nestjs-infra'
import { Role } from '@diut/hcdc'

export class RoleSearchRequestDto extends SearchRequestDto<Role> {}
