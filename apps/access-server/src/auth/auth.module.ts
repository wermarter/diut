import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { validateConfig } from 'src/core/config/validate-config'

import { UserModule } from 'src/resources/users'
import { AuthConfig, AUTH_CONFIG_NAME } from './auth.config'
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
        const config = validateConfig(AuthConfig)(
          configService.get(AUTH_CONFIG_NAME)
        )

        return {
          secret: config.jwtSecret,
          signOptions: {
            expiresIn: config.expiresIn,
          },
        }
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
