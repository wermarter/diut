import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { BaseResourceResponseDto } from '@diut/nest-core'
import { exampleUser } from 'src/domain'

export class UserResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty(exampleUser.username)
  @IsString()
  @IsNotEmpty()
  username: string

  @Expose()
  @ApiProperty(exampleUser.name)
  @IsString()
  @IsNotEmpty()
  name: string

  @Expose()
  @ApiProperty(exampleUser.phoneNumber)
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phoneNumber?: string
}
