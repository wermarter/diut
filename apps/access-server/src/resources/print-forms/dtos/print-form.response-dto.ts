import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsBoolean, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

import { BaseResourceResponseDto } from 'src/clients/mongo'

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
}
