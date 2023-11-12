import { PartialType } from '@nestjs/swagger'

import { CreateBioProductRequestDto } from './create-bio-product.request-dto'

export class UpdateBioProductRequestDto extends PartialType(
  CreateBioProductRequestDto,
) {}
