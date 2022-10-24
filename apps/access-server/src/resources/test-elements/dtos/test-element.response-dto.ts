import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator'

import { BaseResourceResponseDto, IsObjectId } from 'src/clients/mongo'
import { TestResponseDto } from 'src/resources/tests/dtos/test.response-dto'
import { HighlightRuleDto } from './create-test-element.request-dto'

export class TestElementResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty({
    example: 'WBC123',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @Expose()
  @ApiProperty({
    type: TestResponseDto,
  })
  @IsObjectId()
  test: TestResponseDto

  @Expose()
  @ApiProperty({
    example: 2,
  })
  @IsNumber()
  @Min(1)
  topBottomIndex: number

  @Expose()
  @ApiProperty({
    type: () => HighlightRuleDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HighlightRuleDto)
  highlightRules: HighlightRuleDto[]

  @Expose()
  @ApiProperty({
    example: '10^3/uL',
    required: false,
  })
  @IsOptional()
  @IsString()
  unit?: string
}
