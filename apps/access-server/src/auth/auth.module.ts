import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { loadConfigFromEnv } from '@diut/server-core'

import { UserModule } from 'src/resources/users/user.module'
import { AuthConfig } from '../configs/auth.config'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = loadConfigFromEnv(AuthConfig)

        return {
          secret: config.JWT_SECRET,
          signOptions: {
            expiresIn: config.EXPIRES_IN,
          },
        }
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
