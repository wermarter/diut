import { IsObjectId } from '@diut/nestjs-infra'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'
import { exampleInstrument } from '../../../shared'

export class InstrumentRequestDto {
  @Expose()
  @ApiProperty(exampleInstrument.displayIndex)
  @IsNumber()
  @Min(0)
  displayIndex: number

  @Expose()
  @ApiProperty(exampleInstrument.name)
  @IsNotEmpty()
  @IsString()
  name: string

  @Expose()
  @ApiProperty(exampleInstrument.testId)
  @IsObjectId()
  testId: string

  @Expose()
  @ApiProperty(exampleInstrument.branchId)
  @IsObjectId()
  branchId: string
}
