import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { LOCAL_STRATEGY_KEY } from '../auth.common'

@Injectable()
export class LocalAuthGuard extends AuthGuard(LOCAL_STRATEGY_KEY) {}
