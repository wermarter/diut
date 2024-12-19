import { Inject } from '@nestjs/common'
import { DEFAULT_INSTANCE_ID } from './module-builder'

export function getPuppeteerServiceToken(instanceId?: string) {
  return `PuppeteerService:${instanceId ?? DEFAULT_INSTANCE_ID}`
}

export const InjectPuppeteerService = (instanceId?: string) =>
  Inject(getPuppeteerServiceToken(instanceId))
