import { LoggerOptions } from 'pino'

export type PinoModuleOptions<CustomLevels extends string = never> = {
  alternateContextKey?: string
  alternateErrorKey?: string
  options?: LoggerOptions<CustomLevels>
}

export const PINO_DEFAULT_INSTANCE_ID = 'default'
export const PINO_DEFAULT_CONTEXT_KEY = 'context'
export const PINO_DEFAULT_ERROR_KEY = 'error'

export function getPinoLoggerToken(instanceId?: string) {
  return `PinoLogger:${instanceId ?? PINO_DEFAULT_INSTANCE_ID}`
}

export function getPinoNestjsLoggerToken(instanceId?: string) {
  return `PinoNestjsLogger:${instanceId ?? PINO_DEFAULT_INSTANCE_ID}`
}
