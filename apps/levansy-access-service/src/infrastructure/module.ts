import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, concatModuleMetadata } from '@diut/nest-core'

import { authorizationMetadata } from './authz'
import { adapterMetadata } from './adapter'
import { AuthConfig, loadAuthConfig } from 'src/config'

export const infrastructureMetadata = concatModuleMetadata([
  {
    imports: [
      JwtModule.registerAsync({
        imports: [ConfigModule.forFeature(loadAuthConfig)],
        inject: [loadAuthConfig.KEY],
        useFactory: (authConfig: AuthConfig) => {
          return {
            secret: authConfig.AUTH_JWT_SECRET,
            signOptions: {
              expiresIn: authConfig.AUTH_JWT_EXPIRES_IN,
            },
          }
        },
      }),
    ],
  },
  authorizationMetadata,
  adapterMetadata,
])
