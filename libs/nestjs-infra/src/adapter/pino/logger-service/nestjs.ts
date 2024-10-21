import { Inject, LoggerService } from '@nestjs/common'
import { Level } from 'pino'

import { MODULE_OPTIONS_TOKEN } from '../module-builder'
import {
  PINO_DEFAULT_CONTEXT_KEY,
  PINO_DEFAULT_ERROR_KEY,
  PinoModuleOptions,
} from '../utils'
import { PinoLogger } from './pino'

export class PinoNestjsLogger implements LoggerService {
  private readonly contextKey: string
  private readonly errorKey: string

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    readonly options: PinoModuleOptions,
    protected readonly logger: PinoLogger,
  ) {
    this.contextKey = options.alternateContextKey ?? PINO_DEFAULT_CONTEXT_KEY
    this.errorKey = options.alternateErrorKey ?? PINO_DEFAULT_ERROR_KEY
  }

  verbose(message: any, ...optionalParams: any[]) {
    this.call('trace', message, ...optionalParams)
  }

  debug(message: any, ...optionalParams: any[]) {
    this.call('debug', message, ...optionalParams)
  }

  log(message: any, ...optionalParams: any[]) {
    this.call('info', message, ...optionalParams)
  }

  warn(message: any, ...optionalParams: any[]) {
    this.call('warn', message, ...optionalParams)
  }

  error(message: any, ...optionalParams: any[]) {
    this.call('error', message, ...optionalParams)
  }

  fatal(message: any, ...optionalParams: any[]) {
    this.call('fatal', message, ...optionalParams)
  }

  private call(level: Level, message: any, ...optionalParams: any[]) {
    const objArg: Record<string, any> = {}

    // optionalParams contains extra params passed to logger
    // context name is the last item
    let params: any[] = []
    if (optionalParams.length !== 0) {
      objArg[this.contextKey] = optionalParams[optionalParams.length - 1]
      params = optionalParams.slice(0, -1)
    }

    if (typeof message === 'object') {
      if (message instanceof Error) {
        objArg[this.errorKey] = message
      } else {
        Object.assign(objArg, message)
      }
      this.logger[level](objArg, ...params)
    } else {
      this.logger[level](objArg, message, ...params)
    }
  }
}
