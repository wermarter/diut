import { ApiProperty } from '@nestjs/swagger'
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator'

export class CreatePrintFormRequestDto {
  @ApiProperty({
    example: 'Form HIV',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    example: 'hiv',
  })
  @IsString()
  @IsNotEmpty()
  filename: string

  @ApiProperty({
    example: 2,
  })
  @IsNumber()
  @Min(1)
  index: number

  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  isAuthorLocked: boolean

  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  isA4: boolean

  @ApiProperty({
    example: 'Chức vụ',
  })
  @IsString()
  authorPosition: string

  @ApiProperty({
    example: 'Tên',
  })
  @IsString()
  authorName: string

  @ApiProperty({
    example: 4,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  titleMargin: number
}
