import { SampleExceptionMsg } from '@diut/hcdc'
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
import {
  BaseResourceResponseDto,
  ExposeObjectId,
  IsObjectId,
  BadRequestDto,
} from '@diut/nestjs-infra'

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
    format: 'date-time',
    example: '2022-10-24T10:15:00Z',
  })
  @IsDateString()
  infoAt: Date

  @ExposeObjectId()
  @ApiProperty({
    example: '634180269de1f07e47bbf494',
  })
  @IsObjectId()
  infoBy: string

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
    example: '634180269de1f07e47bbf494',
  })
  @IsObjectId()
  sampleOriginId: string

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
  results: TestResultDto[]

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

  @Expose()
  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  isTraBuuDien: boolean

  @Expose()
  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  isNgoaiGio: boolean

  @Expose()
  @ApiProperty({
    example: 'ghi chú nho nhỏ...',
    required: false,
  })
  @IsOptional()
  @IsString()
  note?: string

  @Expose()
  @ApiProperty({
    example: '634180269de1f07e47bbf494',
    required: false,
  })
  @IsOptional()
  @IsObjectId()
  printedBy?: string

  @Expose()
  @ApiProperty({
    format: 'date-time',
    example: '2022-10-24T10:15:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  printedAt?: Date
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

  @ExposeObjectId()
  @ApiProperty({
    example: '634180269de1f07e47bbf494',
    required: false,
  })
  @IsOptional()
  @IsObjectId()
  resultBy?: string

  @Expose()
  @ApiProperty({
    format: 'date-time',
    example: '2022-10-24T10:15:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  resultAt?: Date

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
  value: string

  @Expose()
  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  isHighlighted: boolean
}

export class SampleBadRequestDto extends BadRequestDto {
  @ApiProperty({
    enum: SampleExceptionMsg,
    enumName: 'SampleExceptionMsg',
  })
  message: SampleExceptionMsg
}
