import { exampleMongoObjectIds } from '@diut/common'
import { IsObjectId } from '@diut/nestjs-infra'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsArray } from 'class-validator'

import { ReportRequestDto } from './request-dto'

export class ExportSinhHoaRequestDto extends PickType(ReportRequestDto, [
  'fromDate',
  'toDate',
  'branchId',
]) {
  @Expose()
  @ApiProperty(exampleMongoObjectIds)
  @IsArray()
  @IsObjectId({ each: true })
  originIds: string[]
}
