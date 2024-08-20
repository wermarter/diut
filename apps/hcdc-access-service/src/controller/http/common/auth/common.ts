import { SetMetadata } from '@nestjs/common'

export const HTTP_PUBLIC_ROUTE = 'HTTP_PUBLIC_ROUTE'
export const HttpPublicRoute = SetMetadata(HTTP_PUBLIC_ROUTE, true)
