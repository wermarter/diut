import { MongoModule } from './mongo'
import { RedisCacheModule } from './redis-cache'
import { StorageModule } from './storage'

export const clientModules = [MongoModule, RedisCacheModule, StorageModule]
