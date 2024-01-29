import { IsObjectId } from '@diut/nestjs-core'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

import { exampleBioProduct } from 'src/domain'

export class BioProductCreateRequestDto {
  @Expose()
  @ApiProperty(exampleBioProduct.displayIndex)
  @IsNumber()
  @Min(1)
  displayIndex: number

  @Expose()
  @ApiProperty(exampleBioProduct.name)
  @IsString()
  @IsNotEmpty()
  name: string

  @Expose()
  @ApiProperty(exampleBioProduct.branchId)
  @IsObjectId()
  branchId: string
}
