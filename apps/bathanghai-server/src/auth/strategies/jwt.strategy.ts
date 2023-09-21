import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import {
  ExtractJwt,
  Strategy,
  VerifiedCallback,
  StrategyOptions,
} from 'passport-jwt'
import { loadConfigFromEnv } from '@diut/server-core'
import { NodeEnv } from '@diut/common'

import { AuthTokenPayload, JWT_STRATEGY_KEY } from '../auth.common'
import { AuthConfig } from '../../configs/auth.config'
import { AppConfig } from 'src/configs/app.config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY_KEY) {
  constructor() {
    const authConfig = loadConfigFromEnv(AuthConfig)
    const appConfig = loadConfigFromEnv(AppConfig)

    super({
      ignoreExpiration: appConfig.NODE_ENV !== NodeEnv.Development,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authConfig.AUTH_JWT_SECRET,
    } satisfies StrategyOptions)
  }
  validate(payload: AuthTokenPayload, done: VerifiedCallback) {
    done(null, payload)
  }
}
