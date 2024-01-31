import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, concatModuleMetadata } from '@diut/nestjs-infra'

import { AuthConfig, loadAuthConfig } from 'src/config'
import { authMetadata } from './auth'
import { logMetadata } from './log'
import { minioMetadata } from './minio'
import { mongoMetadata } from './mongo'
// import { puppeteerMetadata } from './puppeteer'

export const infraMetadata = concatModuleMetadata([
  {
    imports: [
      JwtModule.registerAsync({
        imports: [ConfigModule.forFeature(loadAuthConfig)],
        inject: [loadAuthConfig.KEY],
        useFactory: (authConfig: AuthConfig) => {
          return {
            secret: authConfig.AUTH_JWT_SECRET,
            signOptions: {
              expiresIn: parseInt(authConfig.AUTH_JWT_EXPIRE_SECONDS),
            },
          }
        },
      }),
    ],
  },
  authMetadata,
  logMetadata,
  minioMetadata,
  mongoMetadata,
  // puppeteerMetadata,
])
