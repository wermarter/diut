import { IsObjectId } from '@diut/nestjs-infra'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsArray, IsNumber, IsOptional, ValidateNested } from 'class-validator'
import { exampleMongoObjectId, exampleMongoObjectIds } from '@diut/common'

import { PrintFormCreateRequestDto } from '../../print-form/dto/create'

export class OverrideAuthorRequestDto extends PickType(
  PrintFormCreateRequestDto,
  ['authorName', 'authorTitle'],
) {}

export class SamplePrintSingleRequestDto {
  @Expose()
  @ApiProperty(exampleMongoObjectId)
  @IsObjectId()
  sampleId: string

  @Expose()
  @ApiProperty(exampleMongoObjectId)
  @IsObjectId()
  printFormId: string

  @Expose()
  @ApiProperty(exampleMongoObjectIds)
  @IsObjectId({ each: true })
  @IsArray()
  testIds: string[]

  @Expose()
  @ApiProperty(exampleMongoObjectIds)
  @IsObjectId({ each: true })
  @IsArray()
  sampleTypeIds: string[]

  @Expose()
  @ApiProperty({ required: false })
  @ValidateNested()
  @Type(() => OverrideAuthorRequestDto)
  @IsOptional()
  overrideAuthor?: OverrideAuthorRequestDto

  @Expose()
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  overrideTitleMargin?: number
}

export class SamplePrintRequestDto {
  @Expose()
  @ApiProperty({
    type: () => SamplePrintSingleRequestDto,
    isArray: true,
  })
  @ValidateNested({ each: true })
  @Type(() => SamplePrintSingleRequestDto)
  @IsArray()
  requests: SamplePrintSingleRequestDto[]
}
