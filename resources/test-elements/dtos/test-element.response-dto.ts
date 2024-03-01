import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator'

import {
  BaseResourceResponseDto,
  ExposeObjectId,
  IsObjectId,
} from '@diut/nestjs-infra'
import { TestResponseDto } from 'src/resources/tests/dtos/test.response-dto'
import { TestElementNormalRuleDto } from './create-test-element.request-dto'

export class TestElementResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty({
    example: 'WBC123',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ExposeObjectId()
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
  index: number

  @Expose()
  @ApiProperty({
    example: 2,
  })
  @IsNumber()
  @Min(1)
  printIndex: number

  @Expose()
  @ApiProperty({
    example: 2,
  })
  @IsNumber()
  @Min(1)
  reportOrder: number

  @Expose()
  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  isParent: boolean

  @Expose()
  @ApiProperty({
    type: () => TestElementNormalRuleDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestElementNormalRuleDto)
  highlightRules: TestElementNormalRuleDto[]

  @Expose()
  @ApiProperty({
    example: '10^3/uL',
    required: false,
  })
  @IsOptional()
  @IsString()
  unit?: string
}
