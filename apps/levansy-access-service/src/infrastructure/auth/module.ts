import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { ModuleMetadata } from '@nestjs/common'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { ConfigModule } from '@diut/nest-core'

import { AuthContextToken, IJwtService, JwtServiceToken } from 'src/domain'
import { AuthContext } from './context'
import { AuthInterceptor } from './interceptor'
import { JwtStrategy } from './strategies'
import { JwtGuard } from './guards'
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
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: AuthContextToken,
      useClass: AuthContext,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
    {
      provide: JwtServiceToken,
      inject: [JwtService],
      useFactory: (jwtService: JwtService): IJwtService => {
        return jwtService
      },
    },
  ],
}
