import { Inject } from '@nestjs/common'
import pino, { Level, Logger } from 'pino'

import {
  PINO_DEFAULT_CONTEXT_KEY,
  PINO_DEFAULT_ERROR_KEY,
  PinoModuleOptions,
} from '../common'
import { INSTANCE_ID_TOKEN, MODULE_OPTIONS_TOKEN } from '../module-builder'

type LoggerFn =
  | ((msg: string, ...args: any[]) => void)
  | ((obj: object, msg?: string, ...args: any[]) => void)

export type IPinoLogger = Record<Level, LoggerFn>

export class PinoLogger implements IPinoLogger {
  private readonly logger: Logger
  private contextValue: string
  private readonly contextKey: string
  private readonly errorKey: string

  constructor(
    @Inject(INSTANCE_ID_TOKEN)
    private readonly instanceId: string,
    @Inject(MODULE_OPTIONS_TOKEN)
    readonly options: PinoModuleOptions,
  ) {
    this.contextKey = options.alternateContextKey ?? PINO_DEFAULT_CONTEXT_KEY
    this.errorKey = options.alternateErrorKey ?? PINO_DEFAULT_ERROR_KEY

    this.logger = pino({
      base: undefined,
      level: 'trace',
      formatters: {
        level(label, number) {
          return { level: label }
        },
      },
      ...options,
    })
  }

  trace(msg: string, ...args: any[]): void
  trace(obj: unknown, msg?: string, ...args: any[]): void
  trace(...args: Parameters<LoggerFn>) {
    this.call('trace', ...args)
  }

  debug(msg: string, ...args: any[]): void
  debug(obj: unknown, msg?: string, ...args: any[]): void
  debug(...args: Parameters<LoggerFn>) {
    this.call('debug', ...args)
  }

  info(msg: string, ...args: any[]): void
  info(obj: unknown, msg?: string, ...args: any[]): void
  info(...args: Parameters<LoggerFn>) {
    this.call('info', ...args)
  }

  warn(msg: string, ...args: any[]): void
  warn(obj: unknown, msg?: string, ...args: any[]): void
  warn(...args: Parameters<LoggerFn>) {
    this.call('warn', ...args)
  }

  error(msg: string, ...args: any[]): void
  error(obj: unknown, msg?: string, ...args: any[]): void
  error(...args: Parameters<LoggerFn>) {
    this.call('error', ...args)
  }

  fatal(msg: string, ...args: any[]): void
  fatal(obj: unknown, msg?: string, ...args: any[]): void
  fatal(...args: Parameters<LoggerFn>) {
    this.call('fatal', ...args)
  }

  setContext(contextValue: string) {
    this.contextValue = contextValue
  }

  call(method: pino.Level, ...args: Parameters<LoggerFn>) {
    if (this.contextValue) {
      if (isFirstArgObject(args)) {
        const firstArg = args[0]
        if (firstArg instanceof Error) {
          args = [
            Object.assign(
              { [this.contextKey]: this.contextValue },
              { [this.errorKey]: firstArg },
            ),
            ...args.slice(1),
          ]
        } else {
          args = [
            Object.assign({ [this.contextKey]: this.contextValue }, firstArg),
            ...args.slice(1),
          ]
        }
      } else {
        args = [{ [this.contextKey]: this.contextValue }, ...args]
      }
    }

    // @ts-ignore args are union of tuple types
    this.logger[method](...args)
  }
}

function isFirstArgObject(
  args: Parameters<LoggerFn>,
): args is [obj: object, msg?: string, ...args: any[]] {
  return typeof args[0] === 'object'
}
