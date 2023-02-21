import { MongoModule } from './mongo'
import { StorageModule } from './storage'

export const clientModules = [MongoModule, StorageModule]
