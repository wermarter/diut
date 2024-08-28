import { makeConfigLoader } from '@diut/nestjs-infra'
import { Expose } from 'class-transformer'
import { IsOptional, IsString, MinLength } from 'class-validator'

export class PuppeteerConfig {
  @Expose()
  @MinLength(3)
  @IsString()
  @IsOptional()
  CHROMIUM_PATH = '/usr/bin/chromium-browser'
}

export const loadPuppeteerConfig = makeConfigLoader(PuppeteerConfig)
