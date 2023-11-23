import { ApiProperty } from '@nestjs/swagger'
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

import { IsObjectId } from '@diut/server-core'

export class CreateSampleRequestDto {
  @ApiProperty({
    example: '2232010819',
  })
  @IsString()
  @IsNotEmpty()
  sampleId: string

  @ApiProperty({
    format: 'date-time',
    example: '2022-10-24T10:15:00Z',
  })
  @IsDateString()
  sampledAt: Date

  @ApiProperty({
    format: 'date-time',
    example: '2022-10-24T10:15:00Z',
  })
  @IsDateString()
  infoAt: Date

  @ApiProperty({
    example: '634180269de1f07e47bbf494',
  })
  @IsObjectId()
  patientId: string

  @ApiProperty({
    example: '634180269de1f07e47bbf494',
  })
  @IsObjectId()
  doctorId: string

  @ApiProperty({
    example: '634180269de1f07e47bbf494',
  })
  @IsObjectId()
  patientTypeId: string

  @ApiProperty({
    example: '634180269de1f07e47bbf494',
  })
  @IsObjectId()
  indicationId: string

  @ApiProperty({
    example: '634180269de1f07e47bbf494',
  })
  @IsObjectId()
  sampleOriginId: string

  @ApiProperty({
    example: ['634180269de1f07e47bbf494'],
  })
  @IsString({ each: true })
  sampleTypeIds: string[]

  @ApiProperty({
    type: () => SampleTestDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SampleTestDto)
  tests: SampleTestDto[]

  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  isTraBuuDien: boolean

  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  isNgoaiGio: boolean

  @ApiProperty({
    example: 'ghi chú nho nhỏ...',
    required: false,
  })
  @IsOptional()
  @IsString()
  note?: string
}

class SampleTestDto {
  @ApiProperty({
    example: '634180269de1f07e47bbf494',
  })
  @IsObjectId()
  id: string

  @ApiProperty({
    example: 'CHIV Advia centaur',
    required: false,
  })
  @IsOptional()
  @IsString()
  bioProductName?: string
}
