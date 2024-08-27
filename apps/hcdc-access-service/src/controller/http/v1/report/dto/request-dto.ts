import {
  exampleDate,
  exampleMongoObjectId,
  exampleMongoObjectIds,
} from '@diut/common'
import { IsObjectId } from '@diut/nestjs-infra'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsArray, IsDateString } from 'class-validator'

export class ReportRequestDto {
  @Expose()
  @ApiProperty(exampleDate)
  @IsDateString()
  fromDate: string

  @Expose()
  @ApiProperty(exampleDate)
  @IsDateString()
  toDate: string

  @Expose()
  @ApiProperty(exampleMongoObjectId)
  @IsObjectId()
  branchId: string

  @Expose()
  @ApiProperty(exampleMongoObjectIds)
  @IsArray()
  @IsObjectId({ each: true })
  originIds: string[]

  @Expose()
  @ApiProperty(exampleMongoObjectIds)
  @IsArray()
  @IsObjectId({ each: true })
  patientTypeIds: string[]

  @Expose()
  @ApiProperty(exampleMongoObjectIds)
  @IsArray()
  @IsObjectId({ each: true })
  testIds: string[]

  @Expose()
  @ApiProperty(exampleMongoObjectIds)
  @IsArray()
  @IsObjectId({ each: true })
  testComboIds: string[]
}
