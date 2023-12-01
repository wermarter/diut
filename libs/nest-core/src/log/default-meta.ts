import { trace, context } from '@opentelemetry/api'

export const buildWinstonDefaultMeta = () => ({
  // service: serviceName,
  get spanId() {
    // console.log here to debug
    return trace.getSpan(context.active())?.spanContext().spanId
  },
  get traceId() {
    return trace.getSpan(context.active())?.spanContext().traceId
  },
})
