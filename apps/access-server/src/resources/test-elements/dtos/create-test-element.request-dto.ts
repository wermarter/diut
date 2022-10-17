import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator'
import { IsObjectId } from 'src/clients/mongo'

export class CreateTestElementRequestDto {
  @ApiProperty({
    example: 'WBC123',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    example: '634180269de1f07e47bbf494',
  })
  @IsObjectId()
  test: string

  @ApiProperty({
    example: 2,
  })
  @IsNumber()
  @Min(1)
  topBottomIndex: number

  @ApiProperty({
    example: { any: { min: 0, max: 1, normalValue: 'positive' } },
  })
  @IsObject()
  highlightRule: object

  @ApiProperty({
    example: '10^3/uL',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  unit?: string

  @ApiProperty({
    example: 'PR+NP >= 40%',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  notice?: string
}
