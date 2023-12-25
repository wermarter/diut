import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifiedCallback, StrategyOptions } from 'passport-jwt'
import { NodeEnv } from '@diut/common'
import { Request } from 'express'

import { AUTH_JWT_ACCESS_TOKEN_COOKIE, AUTH_JWT_STRATEGY_KEY } from './common'
import {
  AppConfig,
  AuthConfig,
  loadAppConfig,
  loadAuthConfig,
} from 'src/config'
import {
  AuthPayload,
  EAuthnAccessTokenCookieExpired,
  EAuthzPayloadNotFound,
} from 'src/domain'

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
      // ignoreExpiration: appConfig.NODE_ENV === NodeEnv.Development,
      jwtFromRequest: (req: Request) => {
        const jwtAccessToken = req.signedCookies[AUTH_JWT_ACCESS_TOKEN_COOKIE]
        if (!jwtAccessToken) {
          throw new EAuthnAccessTokenCookieExpired()
        }

        return jwtAccessToken
      },
      secretOrKey: authConfig.AUTH_JWT_SECRET,
    } satisfies StrategyOptions)
  }

  validate(payload: AuthPayload, done: VerifiedCallback) {
    if (!payload) {
      return done(new EAuthzPayloadNotFound())
    }

    done(null, payload)
  }
}
