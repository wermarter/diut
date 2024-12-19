import { Inject } from '@nestjs/common'
import { DEFAULT_INSTANCE_ID } from './module-builder'

export function getRedisServiceToken(instanceId?: string) {
  return `RedisService:${instanceId ?? DEFAULT_INSTANCE_ID}`
}

export const InjectRedisService = (instanceId?: string) =>
  Inject(getRedisServiceToken(instanceId))
