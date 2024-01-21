import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

import { exampleBioProduct } from 'src/domain'

export class BioProductCreateRequestDto {
  @Expose()
  @ApiProperty(exampleBioProduct.index)
  @IsNumber()
  @Min(1)
  index: number

  @Expose()
  @ApiProperty(exampleBioProduct.name)
  @IsString()
  @IsNotEmpty()
  name: string
}
