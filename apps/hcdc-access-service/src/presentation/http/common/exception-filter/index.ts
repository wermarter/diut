import { AllExceptionsFilter } from './all'
import { BadRequestExceptionFilter } from './bad-request'
import { DomainExceptionFilter } from './domain'

// execution order: bottom-up
export const exceptionFilters = [
  AllExceptionsFilter,
  DomainExceptionFilter,
  BadRequestExceptionFilter,
]
