import { Inject } from '@nestjs/common'
import { DEFAULT_INSTANCE_ID } from './module-builder'

export function getAwsS3ServiceToken(instanceId?: string) {
  return `AwsS3Service:${instanceId ?? DEFAULT_INSTANCE_ID}`
}

export const InjectAwsS3Service = (instanceId?: string) =>
  Inject(getAwsS3ServiceToken(instanceId))
