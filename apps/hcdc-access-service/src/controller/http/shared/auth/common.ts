import { SetMetadata } from '@nestjs/common'

export const METADATA_HTTP_PUBLIC_ROUTE = 'METADATA_HTTP_PUBLIC_ROUTE'
export const HttpPublicRoute = SetMetadata(METADATA_HTTP_PUBLIC_ROUTE, true)
