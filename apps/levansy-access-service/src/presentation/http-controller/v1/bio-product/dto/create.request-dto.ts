import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

import { exampleBioProduct } from 'src/domain'

export class BioProductCreateRequestDto {
  @ApiProperty(exampleBioProduct.name)
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty(exampleBioProduct.index)
  @IsNumber()
  @Min(1)
  index: number
}
