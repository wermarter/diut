import { RedisClientService } from '@diut/nestjs-infra'

export const CachePrimaryServiceToken = Symbol('CachePrimaryService')
export const CacheSecondaryServiceToken = Symbol('CacheSecondaryService')

export interface ICachePrimaryService extends RedisClientService {}
export interface ICacheSecondaryService extends RedisClientService {}
