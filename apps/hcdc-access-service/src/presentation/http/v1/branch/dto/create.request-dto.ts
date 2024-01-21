import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

import { BranchType, exampleBranch } from 'src/domain'

export class BranchCreateRequestDto {
  @Expose()
  @ApiProperty(exampleBranch.index)
  @IsNumber()
  @Min(1)
  index: number

  @Expose()
  @ApiProperty(exampleBranch.name)
  @IsString()
  @IsNotEmpty()
  name: string

  @Expose()
  @ApiProperty(exampleBranch.address)
  @IsString()
  @IsNotEmpty()
  address: string

  @Expose()
  @ApiProperty(exampleBranch.type)
  @IsEnum(BranchType)
  type: BranchType
}
