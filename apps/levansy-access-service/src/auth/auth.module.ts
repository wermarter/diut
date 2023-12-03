import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { UserModule } from 'src/resources/users/user.module'
import { AuthConfig, loadAuthConfig } from '../configs/auth.config'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'
import { ConfigModule } from '@diut/nest-core'

@Module({
  imports: [
    UserModule,
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
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
