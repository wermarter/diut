import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifiedCallback, StrategyOptions } from 'passport-jwt'
import { Request } from 'express'

import { AUTH_JWT_STRATEGY_KEY } from './common'
import { AuthConfig, loadAuthConfig } from 'src/config'
import {
  AuthPayload,
  EAuthnCookieAccessTokenNotFound,
  EAuthnPayloadNotFound,
} from 'src/domain'
import { AuthCookieService } from '../cookie.service'

@Injectable()
export class HttpJwtStrategy extends PassportStrategy(
  Strategy,
  AUTH_JWT_STRATEGY_KEY,
) {
  constructor(
    @Inject(loadAuthConfig.KEY) authConfig: AuthConfig,
    authCookieService: AuthCookieService,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        const { accessToken } = authCookieService.getAuthCookie(req)

        if (!accessToken) {
          throw new EAuthnCookieAccessTokenNotFound()
        }

        return accessToken
      },
      secretOrKey: authConfig.AUTH_JWT_SECRET,
    } satisfies StrategyOptions)
  }

  validate(payload: AuthPayload, done: VerifiedCallback) {
    if (!payload) {
      return done(new EAuthnPayloadNotFound())
    }

    done(null, payload)
  }
}
