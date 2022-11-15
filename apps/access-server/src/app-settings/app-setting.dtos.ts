import { AppSetting } from '@diut/common'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum } from 'class-validator'

export class GetAppSettingRequestDto {
  @ApiProperty({
    example: AppSetting[0],
    enum: AppSetting,
  })
  @IsEnum(AppSetting)
  setting: AppSetting
}

export class SetAppSettingRequestDto {
  @ApiProperty({
    example: AppSetting[0],
    enum: AppSetting,
  })
  @IsEnum(AppSetting)
  setting: AppSetting

  @ApiProperty({
    type: 'unknown',
    example: 'example_value',
  })
  value: unknown
}
