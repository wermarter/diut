export type PinoModuleOptions = {
  serviceName: string
  lokiUrl?: string
  alternateContextKey?: string
}

export const DEFAULT_INSTANCE_ID = 'default'

export function getPinoLoggerToken(instanceId?: string) {
  return `PinoLogger:${instanceId ?? DEFAULT_INSTANCE_ID}`
}

export function getPinoNestjsLoggerToken(instanceId?: string) {
  return `PinoNestjsLogger:${instanceId ?? DEFAULT_INSTANCE_ID}`
}
