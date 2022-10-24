import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator'

import { BaseResourceResponseDto, IsObjectId } from 'src/clients/mongo'
import { BioProductResponseDto } from 'src/resources/bio-products/dtos/bio-product.response-dto'
import { TestCategoryResponseDto } from 'src/resources/test-categories/dtos/test-category.response-dto'

export class TestResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty({
    type: TestCategoryResponseDto,
  })
  @IsObjectId()
  category: TestCategoryResponseDto

  @Expose()
  @ApiProperty({
    type: BioProductResponseDto,
    required: false,
  })
  @IsOptional()
  @IsObjectId()
  bioProduct?: BioProductResponseDto

  @Expose()
  @ApiProperty({
    example: 'Tên XN',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @Expose()
  @ApiProperty({
    example: 2,
  })
  @IsNumber()
  @Min(1)
  topBottomIndex: number
}
