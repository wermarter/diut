import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { Type } from 'class-transformer'
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'

import {
  BaseResourceResponseDto,
  ExposeObjectId,
  IsObjectId,
} from 'src/clients/mongo'

export class SampleResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty({
    example: '2232010819',
  })
  @IsString()
  @IsNotEmpty()
  sampleId: string

  @Expose()
  @ApiProperty({
    format: 'date-time',
    example: '2022-10-24T10:15:00Z',
  })
  @IsDateString()
  sampledAt: Date

  @Expose()
  @ApiProperty({
    example: '634180269de1f07e47bbf494',
  })
  @IsObjectId()
  createdBy: string

  @ExposeObjectId()
  @ApiProperty({
    example: '634180269de1f07e47bbf494',
  })
  @IsObjectId()
  patientId: string

  @ExposeObjectId()
  @ApiProperty({
    example: '634180269de1f07e47bbf494',
  })
  @IsObjectId()
  doctorId: string

  @ExposeObjectId()
  @ApiProperty({
    example: '634180269de1f07e47bbf494',
  })
  @IsObjectId()
  patientTypeId: string

  @ExposeObjectId()
  @ApiProperty({
    example: '634180269de1f07e47bbf494',
  })
  @IsObjectId()
  indicationId: string

  @ExposeObjectId()
  @ApiProperty({
    example: ['634180269de1f07e47bbf494'],
  })
  @IsString({ each: true })
  sampleTypeIds: string[]

  @Expose()
  @ApiProperty({
    type: () => TestResultDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestResultDto)
  result: TestResultDto[]

  @ExposeObjectId()
  @ApiProperty({
    example: ['634180269de1f07e47bbf494'],
  })
  @IsString({ each: true })
  resultBy: string[]

  @Expose()
  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  infoCompleted: boolean

  @Expose()
  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  sampleCompleted: boolean
}

export class TestResultDto {
  @ExposeObjectId()
  @ApiProperty({
    example: '634180269de1f07e47bbf494',
  })
  @IsObjectId()
  testId: string

  @Expose()
  @ApiProperty({
    example: 'CHIV Advia centaur',
    required: false,
  })
  @IsOptional()
  @IsString()
  bioProductName?: string

  @Expose()
  @ApiProperty({
    example: '634180269de1f07e47bbf494',
  })
  @IsObjectId()
  resultBy: string

  @Expose()
  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  testCompleted: boolean

  @Expose()
  @ApiProperty({
    type: () => TestElementResultDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestElementResultDto)
  elements: TestElementResultDto[]
}

export class TestElementResultDto {
  @ExposeObjectId()
  @ApiProperty({
    example: '634180269de1f07e47bbf494',
  })
  @IsObjectId()
  id: string

  @Expose()
  @ApiProperty({
    example: 'Neg',
  })
  @IsString()
  @IsNotEmpty()
  value: string

  @Expose()
  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  isHighlighted: boolean
}
