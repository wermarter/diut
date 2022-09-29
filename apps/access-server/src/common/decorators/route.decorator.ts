import { applyDecorators } from '@nestjs/common'

export interface AppRouteOptions {}

export function AppRoute(options: AppRouteOptions) {
  return applyDecorators()
}
