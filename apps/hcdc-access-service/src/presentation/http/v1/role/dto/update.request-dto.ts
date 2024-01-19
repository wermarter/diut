import { PartialType } from '@nestjs/swagger'

import { RoleCreateRequestDto } from './create.request-dto'

export class RoleUpdateRequestDto extends PartialType(RoleCreateRequestDto) {}
