import { PrintForm } from '@diut/common'
import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator'

import { BaseResourceResponseDto } from 'src/clients/mongo'
import { BioProductResponseDto } from 'src/resources/bio-products/dtos/bio-product.response-dto'
import { TestCategoryResponseDto } from 'src/resources/test-categories/dtos/test-category.response-dto'

export class TestResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty({
    type: TestCategoryResponseDto,
  })
  @ValidateNested()
  @Type(() => TestCategoryResponseDto)
  category: TestCategoryResponseDto

  @Expose()
  @ApiProperty({
    type: BioProductResponseDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => BioProductResponseDto)
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
  index: number

  @Expose()
  @ApiProperty({
    example: PrintForm.Basic,
    enum: PrintForm,
  })
  @IsEnum(PrintForm)
  printForm: PrintForm
}
