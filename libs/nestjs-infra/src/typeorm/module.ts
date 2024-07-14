import { Inject, Logger, Module, OnApplicationShutdown } from '@nestjs/common'
import { DataSource } from 'typeorm'

import { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } from './module-builder'
import { TypeormDatasourceToken, TypeormModuleOptions } from './common'

@Module({
  providers: [
    {
      provide: TypeormDatasourceToken,
      inject: [MODULE_OPTIONS_TOKEN],
      async useFactory(options: TypeormModuleOptions) {
        const logger = new Logger('TypeormModule')
        try {
          const datasource = new DataSource(options)
          await datasource.initialize()
          return datasource
        } catch (e) {
          logger.error('cannot connect')
          throw e
        }
      },
    },
  ],
  exports: [TypeormDatasourceToken],
})
export class TypeormModule
  extends ConfigurableModuleClass
  implements OnApplicationShutdown
{
  constructor(
    @Inject(TypeormDatasourceToken) private readonly datasource: DataSource,
  ) {
    super()
  }

  async onApplicationShutdown() {
    await this.datasource.destroy()
  }
}
