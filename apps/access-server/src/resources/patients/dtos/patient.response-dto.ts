import { Gender, numericEnumArray } from '@diut/common'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

import { BaseResourceResponseDto } from 'src/clients/mongo'

export class PatientResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty({
    example: '1220406272',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  externalId?: string

  @Expose()
  @ApiProperty({
    example: 'Lê Văn A',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @Expose()
  @ApiProperty({
    example: Gender.Male,
    enum: numericEnumArray(Gender),
  })
  @IsEnum(Gender)
  gender: Gender

  @Expose()
  @ApiProperty({
    example: 1999,
  })
  @IsNumber()
  birthYear: number

  @Expose()
  @ApiProperty({
    example: 'QUẬN 11 - HCM',
  })
  @IsString()
  @IsNotEmpty()
  address: string

  @Expose()
  @ApiProperty({
    example: '0335330808',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phoneNumber?: string

  @Expose()
  @ApiProperty({
    example: '301719666',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  SSN?: string
}
