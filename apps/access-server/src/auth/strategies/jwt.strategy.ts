import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt'

import { AuthTokenPayload, JWT_STRATEGY_KEY } from '../auth.common'
import { AuthConfig } from '../../configs/auth.config'
import { loadConfigFromEnv } from '@diut/server-core'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY_KEY) {
  constructor() {
    const authConfig = loadConfigFromEnv(AuthConfig)
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authConfig.JWT_SECRET,
    })
  }
  validate(payload: AuthTokenPayload, done: VerifiedCallback) {
    done(null, payload)
  }
}
