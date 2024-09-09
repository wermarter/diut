import { Module } from '@nestjs/common'
import {
  ConfigModuleOptions,
  ConfigModule as NestConfigModule,
} from '@nestjs/config'
import { merge } from 'es-toolkit'

const defaultRootConfig: ConfigModuleOptions = {
  cache: true,
  expandVariables: true,
}

@Module({
  imports: [NestConfigModule.forRoot(defaultRootConfig)],
})
export class ConfigModule extends NestConfigModule {
  static forRoot(options: ConfigModuleOptions) {
    return super.forRoot(merge(defaultRootConfig, options))
  }
}
