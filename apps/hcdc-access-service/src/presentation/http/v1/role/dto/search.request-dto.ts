import { SearchRequestDto } from '@diut/nest-core'

import { Role } from 'src/domain'

export class RoleSearchRequestDto extends SearchRequestDto<Role> {}
