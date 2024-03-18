import { registerAs } from '@nestjs/config'
import { makeConfigLoader } from '@diut/nestjs-infra'
import { IsOptional, IsString, MinLength } from 'class-validator'
import { Expose } from 'class-transformer'

export class PuppeteerConfig {
  @Expose()
  @IsOptional()
  @MinLength(3)
  @IsString()
  CHROMIUM_PATH = '/usr/bin/chromium-browser'
}

export const loadPuppeteerConfig = makeConfigLoader(PuppeteerConfig)
