import { context } from '@opentelemetry/api'
import { suppressTracing } from '@opentelemetry/core'

export function disableTracing(callback: () => any) {
  const suppressTracingContext = suppressTracing(context.active())
  return context.with(suppressTracingContext, callback)
}
