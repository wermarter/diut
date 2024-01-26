import { IsObjectId } from '@diut/nest-core'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

import { exampleInstrument } from 'src/domain'

export class InstrumentCreateRequestDto {
  @Expose()
  @ApiProperty(exampleInstrument.displayIndex)
  @IsNumber()
  @Min(1)
  displayIndex: number

  @Expose()
  @ApiProperty(exampleInstrument.name)
  @IsString()
  @IsNotEmpty()
  name: string

  @Expose()
  @ApiProperty(exampleInstrument.branchId)
  @IsObjectId()
  branchId: string
}