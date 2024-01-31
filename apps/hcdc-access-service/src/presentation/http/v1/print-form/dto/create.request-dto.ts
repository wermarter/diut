import { IsObjectId } from '@diut/nestjs-infra'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator'

import { PrintTemplate, examplePrintForm } from 'src/domain'

export class PrintFormCreateRequestDto {
  @Expose()
  @ApiProperty(examplePrintForm.displayIndex)
  @IsNumber()
  @Min(1)
  displayIndex: number

  @Expose()
  @ApiProperty(examplePrintForm.name)
  @IsString()
  @IsNotEmpty()
  name: string

  @Expose()
  @ApiProperty(examplePrintForm.isA4)
  @IsBoolean()
  isA4: boolean

  @Expose()
  @ApiProperty(examplePrintForm.isAuthorLocked)
  @IsBoolean()
  isAuthorLocked: boolean

  @Expose()
  @ApiProperty(examplePrintForm.authorTitle)
  @IsString()
  @IsNotEmpty()
  authorTitle: string

  @Expose()
  @ApiProperty(examplePrintForm.authorName)
  @IsString()
  @IsNotEmpty()
  authorName: string

  @Expose()
  @ApiProperty(examplePrintForm.titleMargin)
  @IsNumber()
  titleMargin: number

  @Expose()
  @ApiProperty(examplePrintForm.template)
  @IsEnum(PrintTemplate)
  template: PrintTemplate

  @Expose()
  @ApiProperty(examplePrintForm.branchId)
  @IsObjectId()
  branchId: string
}
