import { concatModuleMetadata } from '@diut/nestjs-infra'

import { grpcMetadata } from './grpc'

export const presentationMetadata = concatModuleMetadata([grpcMetadata])
