import { NodeEnv } from '@diut/common'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { JWT_STRATEGY_KEY } from '../auth.common'
import { AuthConfig, AUTH_CONFIG_NAME } from '../auth.config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY_KEY) {
  constructor(configService: ConfigService) {
    super({
      ignoreExpiration: configService.get('env') !== NodeEnv.Production,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<AuthConfig>(AUTH_CONFIG_NAME).jwtSecret,
    })
  }
  validate() {
    return true
  }
}
