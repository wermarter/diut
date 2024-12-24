import { ModuleMetadata } from '@nestjs/common'
import { appMetadata } from 'src/app'
import { configMetadata } from 'src/config'
import { infraMetadata } from 'src/infra'

export const commonModuleMetadata: ModuleMetadata[] = [
  configMetadata,
  infraMetadata,
  appMetadata,
]
