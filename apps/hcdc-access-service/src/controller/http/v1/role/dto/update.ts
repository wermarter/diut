import { PartialType } from '@nestjs/swagger'

import { RoleRequestDto } from './request-dto'

export class RoleUpdateRequestDto extends PartialType(RoleRequestDto) {}
