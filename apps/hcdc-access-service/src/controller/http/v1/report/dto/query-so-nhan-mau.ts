import { exampleMongoObjectId } from '@diut/common'
import {
  IsObjectId,
  PaginatedResponse,
  SearchRequestDto,
} from '@diut/nestjs-infra'
import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator'

import { OmittedSampleResponseDto } from '../../sample/dto/response-dto'
import { ReportRequestDto } from './request-dto'

export class ReportQuerySoNhanMauRequestDto extends IntersectionType(
  PickType(ReportRequestDto, ['fromDate', 'toDate', 'branchId']),
  PickType(SearchRequestDto, ['offset', 'limit']),
) {
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

export class ReportQuerySoNhanMauSummaryResponseDto {
  @Expose()
  @ApiProperty()
  test: unknown

  @Expose()
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  isTraBuuDien: number

  @Expose()
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  isNgoaiGio: number
}

export class ReportQuerySoNhanMauResponseDto extends PaginatedResponse(
  OmittedSampleResponseDto,
) {
  @Expose()
  @ApiProperty({ type: () => ReportQuerySoNhanMauSummaryResponseDto })
  @ValidateNested()
  @Type(() => ReportQuerySoNhanMauSummaryResponseDto)
  summary: ReportQuerySoNhanMauSummaryResponseDto
}
