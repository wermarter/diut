import { Gender, numericEnumArray } from '@diut/common'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreatePatientRequestDto {
  @ApiProperty({
    example: '1220406272',
  })
  @IsString()
  @IsNotEmpty()
  externalId: string

  @ApiProperty({
    example: 'Lê Văn A',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    example: Gender.Male,
    enum: numericEnumArray(Gender),
  })
  @IsEnum(Gender)
  gender: Gender

  @ApiProperty({
    example: 1999,
  })
  @IsNumber()
  birthYear: number

  @ApiProperty({
    example: 'QUẬN 11 - HCM',
  })
  @IsString()
  @IsNotEmpty()
  address: string

  @ApiProperty({
    example: '0335330808',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string

  @ApiProperty({
    example: '301719666',
  })
  @IsString()
  @IsNotEmpty()
  SSN: string
}
