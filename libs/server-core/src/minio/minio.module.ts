import { DynamicModule, FactoryProvider, ModuleMetadata } from '@nestjs/common'
import { ClientOptions } from 'minio'
import { MinioModule as NestMinioModule } from 'nestjs-minio-client'

import { MinioService } from './minio.service'

export type MinioModuleExtraOptions = {}

type MinioModuleOptions = Omit<ClientOptions, keyof MinioModuleExtraOptions> &
  MinioModuleExtraOptions

type MinioModuleAsyncOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider, 'inject'> & {
    useFactory: (
      ...args: any[]
    ) => MinioModuleOptions | Promise<MinioModuleOptions>
  }

export class MinioModule {
  static forRootAsync({
    imports,
    inject,
    useFactory,
  }: MinioModuleAsyncOptions): DynamicModule {
    const dynamicModule = NestMinioModule.registerAsync({
      imports,
      inject,
      useFactory: async (...args) => {
        const options = await useFactory(...args)
        return options
      },
    })

    return {
      global: true,
      module: dynamicModule.module,
      imports: dynamicModule.imports,
      providers: [...(dynamicModule.providers ?? []), MinioService],
      exports: [...(dynamicModule.exports ?? []), MinioService],
    }
  }
}
