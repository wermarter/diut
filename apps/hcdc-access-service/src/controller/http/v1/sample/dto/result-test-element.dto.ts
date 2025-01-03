import { IsNullable, IsObjectId } from '@diut/nestjs-infra'
import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import {
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'
import { exampleTestElementResult } from '../../../shared'
import { TestElementUnpopulatedResponseDto } from '../../test-element/dto/response-dto'

export class SampleResultTestElementRequestDto {
  @Expose()
  @ApiProperty(exampleTestElementResult.testElementId)
  @IsObjectId()
  testElementId: string

  @Expose()
  @ApiProperty(exampleTestElementResult.value)
  @IsString()
  value: string

  @Expose()
  @ApiProperty(exampleTestElementResult.isAbnormal)
  @IsBoolean()
  isAbnormal: boolean
}

export class SampleResultTestElementResponseDto extends SampleResultTestElementRequestDto {
  @Expose()
  @ApiProperty({
    ...exampleTestElementResult.testElement,
    type: () => TestElementUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => TestElementUnpopulatedResponseDto)
  @IsNullable()
  @IsOptional()
  testElement?: TestElementUnpopulatedResponseDto | null
}
