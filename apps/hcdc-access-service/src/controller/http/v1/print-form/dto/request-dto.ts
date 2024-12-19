import { PrintTemplate } from '@diut/hcdc'
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
import { examplePrintForm } from '../../../shared'

export class PrintFormRequestDto {
  @Expose()
  @ApiProperty(examplePrintForm.displayIndex)
  @IsNumber()
  @Min(0)
  displayIndex: number

  @Expose()
  @ApiProperty(examplePrintForm.name)
  @IsNotEmpty()
  @IsString()
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
  authorTitle: string

  @Expose()
  @ApiProperty(examplePrintForm.authorName)
  @IsString()
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
