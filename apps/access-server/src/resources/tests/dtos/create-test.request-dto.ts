import { PrintForm } from '@diut/common'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator'

import { IsObjectId } from 'src/clients/mongo'

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
}
