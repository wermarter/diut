import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import {
  ExtractJwt,
  Strategy,
  VerifiedCallback,
  StrategyOptions,
} from 'passport-jwt'
import { NodeEnv } from '@diut/common'

import { AuthTokenPayload, JWT_STRATEGY_KEY } from '../common'
import { AppConfigToken, AuthConfigToken } from 'src/domain'
import { AppConfig, AuthConfig } from 'src/infrastructure/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY_KEY) {
  constructor(
    @Inject(AppConfigToken) appConfig: AppConfig,
    @Inject(AuthConfigToken) authConfig: AuthConfig,
  ) {
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
