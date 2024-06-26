import { IsObjectId } from '@diut/nestjs-infra'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsArray, IsNumber, IsOptional, ValidateNested } from 'class-validator'
import { exampleMongoObjectId, exampleMongoObjectIds } from '@diut/common'

import { PrintFormCreateRequestDto } from '../../print-form/dto/create.request-dto'

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
  @IsArray()
  @IsObjectId({ each: true })
  testIds: string[]

  @Expose()
  @ApiProperty(exampleMongoObjectIds)
  @IsArray()
  @IsObjectId({ each: true })
  sampleTypeIds: string[]

  @Expose()
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => OverrideAuthorRequestDto)
  @ValidateNested()
  overrideAuthor: OverrideAuthorRequestDto

  @Expose()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  overrideTitleMargin: number
}

export class SamplePrintRequestDto {
  @Expose()
  @ApiProperty({
    type: () => SamplePrintSingleRequestDto,
    isArray: true,
  })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => SamplePrintSingleRequestDto)
  requests: SamplePrintSingleRequestDto[]
}
