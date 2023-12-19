import { APP_INTERCEPTOR } from '@nestjs/core'
import { ModuleMetadata } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@diut/nest-core'

import { AuthContextToken } from 'src/domain'
import { AuthContext } from './context'
import { AuthInterceptor } from './interceptor'
import { AuthConfig, loadAuthConfig } from '../config'

export const authMetadata: ModuleMetadata = {
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
  providers: [
    {
      provide: AuthContextToken,
      useClass: AuthContext,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
  ],
}
