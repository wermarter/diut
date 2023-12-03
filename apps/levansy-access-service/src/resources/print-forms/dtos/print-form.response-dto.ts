import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsBoolean, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

import { BaseResourceResponseDto } from '@diut/nest-core'

export class PrintFormResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty({
    example: 'Form HIV',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @Expose()
  @ApiProperty({
    example: 'hiv',
  })
  @IsString()
  @IsNotEmpty()
  filename: string

  @Expose()
  @ApiProperty({
    example: 2,
  })
  @IsNumber()
  @Min(1)
  index: number

  @Expose()
  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  isAuthorLocked: boolean

  @Expose()
  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  isA4: boolean

  @Expose()
  @ApiProperty({
    example: 'Chức vụ',
  })
  @IsString()
  authorPosition: string

  @Expose()
  @ApiProperty({
    example: 'Tên',
  })
  @IsString()
  authorName: string

  @Expose()
  @ApiProperty({
    example: 4,
    required: false,
  })
  @IsNumber()
  @Min(0)
  titleMargin: number
}
