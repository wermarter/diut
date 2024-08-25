import {
  ConfigModule as NestConfigModule,
  ConfigModuleOptions,
  ConfigFactory,
} from '@nestjs/config'
import { Module } from '@nestjs/common'
import { merge } from 'es-toolkit'

const defaultRootConfig: ConfigModuleOptions = {
  isGlobal: true,
  cache: true,
  expandVariables: true,
}

@Module({
  imports: [NestConfigModule.forRoot(defaultRootConfig)],
})
export class ConfigModule {
  static forRoot(options: ConfigModuleOptions) {
    return NestConfigModule.forRoot(merge(defaultRootConfig, options))
  }

  static forFeature(options: ConfigFactory) {
    return NestConfigModule.forFeature(options)
  }
}
