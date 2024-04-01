import { exampleDate, exampleMongoObjectId } from '@diut/common'
import { IsObjectId } from '@diut/nestjs-infra'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsDateString } from 'class-validator'

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
}
