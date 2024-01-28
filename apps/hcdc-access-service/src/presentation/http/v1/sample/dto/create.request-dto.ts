import { IsObjectId } from '@diut/nest-core'
import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'

import { exampleSample } from 'src/domain'
import { SampleResultTestRequestDto } from './result-test.dto'

export class SampleCreateRequestDto {
  @Expose()
  @ApiProperty(exampleSample.sampleId)
  @IsString()
  @IsNotEmpty()
  sampleId: string

  @Expose()
  @ApiProperty(exampleSample.note)
  @IsString()
  note: string

  @Expose()
  @ApiProperty(exampleSample.isNgoaiGio)
  @IsBoolean()
  isNgoaiGio: boolean

  @Expose()
  @ApiProperty(exampleSample.isTraBuuDien)
  @IsBoolean()
  isTraBuuDien: boolean

  @Expose()
  @ApiProperty(exampleSample.isConfirmed)
  @IsBoolean()
  isConfirmed: boolean

  @Expose()
  @ApiProperty(exampleSample.sampleCompleted)
  @IsBoolean()
  sampleCompleted: boolean

  @Expose()
  @ApiProperty(exampleSample.infoAt)
  @IsDateString()
  infoAt: Date

  @Expose()
  @ApiProperty(exampleSample.sampledAt)
  @IsDateString()
  sampledAt: Date

  @Expose()
  @ApiProperty(exampleSample.printedAt)
  @IsOptional()
  @IsDateString()
  printedAt?: Date

  @Expose()
  @ApiProperty({
    ...exampleSample.results,
    type: () => SampleResultTestRequestDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SampleResultTestRequestDto)
  results: SampleResultTestRequestDto[]

  @Expose()
  @ApiProperty(exampleSample.infoById)
  @IsObjectId()
  infoById: string

  @Expose()
  @ApiProperty(exampleSample.printedById)
  @IsOptional()
  @IsObjectId()
  printedById?: string

  @Expose()
  @ApiProperty(exampleSample.patientId)
  @IsObjectId()
  patientId: string

  @Expose()
  @ApiProperty(exampleSample.doctorId)
  @IsObjectId()
  doctorId: string

  @Expose()
  @ApiProperty(exampleSample.patientTypeId)
  @IsObjectId()
  patientTypeId: string

  @Expose()
  @ApiProperty(exampleSample.diagnosisId)
  @IsObjectId()
  diagnosisId: string

  @Expose()
  @ApiProperty(exampleSample.originId)
  @IsObjectId()
  originId: string

  @Expose()
  @ApiProperty(exampleSample.sampleTypeIds)
  @IsArray()
  @IsObjectId({ each: true })
  sampleTypeIds: string[]

  @Expose()
  @ApiProperty(exampleSample.branchId)
  @IsObjectId()
  branchId: string
}
