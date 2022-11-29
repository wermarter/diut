import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MinioModule } from 'nestjs-minio-client'

import { validateConfig } from 'src/core/config/validate-config'
import { StorageConfig, STORAGE_CONFIG_NAME } from './storage.config'
import { StorageService } from './storage.service'

@Global()
@Module({
  imports: [
    MinioModule.registerAsync({
      // isGlobal: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const config = validateConfig(StorageConfig)(
          configService.get(STORAGE_CONFIG_NAME)
        )

        return {
          endPoint: config.endPoint,
          port: config.port,
          accessKey: config.accessKey,
          secretKey: config.secretKey,
          useSSL: false,
        }
      },
    }),
  ],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
