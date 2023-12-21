import { APP_GUARD } from '@nestjs/core'
import { ModuleMetadata } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@diut/nest-core'

import { JwtStrategy } from './strategy'
import { JwtGuard } from './guard'
import { AuthConfig, loadAuthConfig } from 'src/config'

export const authenticationMetadata: ModuleMetadata = {
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
  ],
}
