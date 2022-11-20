import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

export class CreatePrintFormRequestDto {
  @ApiProperty({
    example: 'Form HIV',
  })
  @IsString()
  @IsNotEmpty()
  name: string

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
    example: 'Chức vụ',
  })
  @IsString()
  authorPosition: string

  @ApiProperty({
    example: 'Tên',
  })
  @IsString()
  authorName: string
}
