import { SearchRequestDto } from '@diut/nestjs-infra'

import { Role } from 'src/domain'

export class RoleSearchRequestDto extends SearchRequestDto<Role> {}
