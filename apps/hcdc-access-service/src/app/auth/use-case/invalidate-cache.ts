import { Inject, Injectable } from '@nestjs/common'

import {
  CacheKeyFactory,
  CachePrimaryServiceToken,
  ICachePrimaryService,
} from 'src/domain'

@Injectable()
export class AuthInvalidateCacheUseCase {
  constructor(
    @Inject(CachePrimaryServiceToken)
    private readonly cacheService: ICachePrimaryService,
  ) {}

  async execute(input: { userId: string }) {
    await this.cacheService.client.del(
      CacheKeyFactory.authContextInfo(input.userId),
    )
  }
}
