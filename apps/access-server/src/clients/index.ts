import { MongoModule } from './mongo'
import { RedisCacheModule } from './redis-cache'

export const clientModules = [MongoModule, RedisCacheModule]
