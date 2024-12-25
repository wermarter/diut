import { ApiProperty, PickType } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { PatientUnpopulatedResponseDto } from '../../v1/patient/dto/response-dto'
import { PrintFormUnpopulatedResponseDto } from '../../v1/print-form/dto/response-dto'
import { SampleResponseDto } from '../../v1/sample/dto/response-dto'

class PublicPatientResponseDto extends PickType(PatientUnpopulatedResponseDto, [
  '_id',
  'name',
]) {}

class PublicSampleResponseDto extends PickType(SampleResponseDto, [
  '_id',
  'sampleId',
  'isPregnant',
  'branchId',
  'results',
]) {
  @Expose()
  @ApiProperty({
    type: () => PublicPatientResponseDto,
  })
  @Type(() => PublicPatientResponseDto)
  patient: PublicPatientResponseDto
}

class PublicPrintFormResponseDto extends PickType(
  PrintFormUnpopulatedResponseDto,
  ['_id', 'template'],
) {}

export class ExternalGetSampleResultResponseDto {
  @Expose()
  @ApiProperty({
    type: () => PublicSampleResponseDto,
  })
  @Type(() => PublicSampleResponseDto)
  sample: PublicSampleResponseDto

  @Expose()
  @ApiProperty({
    isArray: true,
    type: () => PublicPrintFormResponseDto,
  })
  @Type(() => PublicPrintFormResponseDto)
  printForms: PublicPrintFormResponseDto[]
}
