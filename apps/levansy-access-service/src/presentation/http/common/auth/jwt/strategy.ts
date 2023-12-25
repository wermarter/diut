import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import {
  ExtractJwt,
  Strategy,
  VerifiedCallback,
  StrategyOptions,
} from 'passport-jwt'
import { NodeEnv } from '@diut/common'

import { AUTH_JWT_STRATEGY_KEY } from './common'
import {
  AppConfig,
  AuthConfig,
  loadAppConfig,
  loadAuthConfig,
} from 'src/config'
import { AuthPayload } from 'src/domain'

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  AUTH_JWT_STRATEGY_KEY,
) {
  constructor(
    @Inject(loadAppConfig.KEY) appConfig: AppConfig,
    @Inject(loadAuthConfig.KEY) authConfig: AuthConfig,
  ) {
    super({
      ignoreExpiration: appConfig.NODE_ENV !== NodeEnv.Development,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authConfig.AUTH_JWT_SECRET,
    } satisfies StrategyOptions)
  }

  validate(payload: AuthPayload, done: VerifiedCallback) {
    // verify auth payload with typia
    done(null, payload)
  }
}
