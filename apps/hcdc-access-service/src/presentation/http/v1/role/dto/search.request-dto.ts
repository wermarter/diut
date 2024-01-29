import { SearchRequestDto } from '@diut/nestjs-core'

import { Role } from 'src/domain'

export class RoleSearchRequestDto extends SearchRequestDto<Role> {}
