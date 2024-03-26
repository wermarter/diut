import {
  IsObjectId,
  PaginatedResponse,
  SearchRequestDto,
} from '@diut/nestjs-infra'
import { ApiProperty, PickType } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsBoolean, IsDateString, IsOptional } from 'class-validator'
import { exampleDate, exampleMongoObjectId } from '@diut/common'

import { OmittedSampleResponseDto } from '../../sample/dto/response-dto'

export class ReportQuerySoNhanMauRequestDto extends PickType(SearchRequestDto, [
  'offset',
  'limit',
]) {
  @Expose()
  @ApiProperty(exampleDate)
  @IsDateString()
  fromDate: Date

  @Expose()
  @ApiProperty(exampleDate)
  @IsDateString()
  toDate: Date

  @Expose()
  @ApiProperty(exampleMongoObjectId)
  @IsObjectId()
  branchId: string

  @Expose()
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isNgoaiGio?: boolean

  @Expose()
  @ApiProperty({ ...exampleMongoObjectId, required: false })
  @IsObjectId()
  @IsOptional()
  patientTypeId?: string

  @Expose()
  @ApiProperty({ ...exampleMongoObjectId, required: false })
  @IsObjectId()
  @IsOptional()
  originId?: string
}

export class ReportQuerySoNhanMauResponseDto extends PaginatedResponse(
  OmittedSampleResponseDto,
) {
  @Expose()
  @ApiProperty()
  summary: unknown
}
