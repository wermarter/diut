import { PrintForm } from '@diut/levansy-common'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator'
import { IsObjectId } from '@diut/server-core'

export class CreateTestRequestDto {
  @ApiProperty({
    example: '634180269de1f07e47bbf494',
  })
  @IsObjectId()
  category: string

  @ApiProperty({
    example: '634180269de1f07e47bbf494',
    required: false,
  })
  @IsOptional()
  @IsObjectId()
  bioProduct?: string

  @ApiProperty({
    example: 'Tên XN',
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
    example: PrintForm.Basic,
    enum: PrintForm,
  })
  @IsEnum(PrintForm)
  printForm: PrintForm

  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  shouldNotPrint: boolean
}
