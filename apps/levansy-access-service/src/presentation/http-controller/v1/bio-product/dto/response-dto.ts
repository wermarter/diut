import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'
import { BaseResourceResponseDto } from '@diut/nest-core'

import { exampleBioProduct } from 'src/domain'

export class BioProductResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty(exampleBioProduct.name)
  @IsString()
  @IsNotEmpty()
  name: string

  @Expose()
  @ApiProperty(exampleBioProduct.index)
  @IsNumber()
  @Min(1)
  index: number
}
