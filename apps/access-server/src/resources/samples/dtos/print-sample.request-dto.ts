import { PrintForm } from '@diut/common'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'

export class PrintSampleRequestDto {
  @ApiProperty({
    type: () => SinglePrintRequestDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SinglePrintRequestDto)
  samples: SinglePrintRequestDto[]
}

export class SinglePrintRequestDto {
  @ApiProperty({
    example: '2232010819',
  })
  @IsString()
  @IsNotEmpty()
  sampleId: string

  @ApiProperty({
    example: PrintForm.Basic,
    enum: PrintForm,
    required: false,
  })
  @IsOptional()
  @IsEnum(PrintForm)
  printForm?: PrintForm

  @ApiProperty({
    example: 'Trưởng khoa',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  authorPosition?: string

  @ApiProperty({
    example: 'BS. Nguyễn Thị Vy Uyên',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  authorName?: string

  @ApiProperty({
    example: ['Máu', 'Dịch mủ'],
    required: false,
  })
  @IsOptional()
  @IsString({ each: true })
  sampleTypes?: string[]
}
