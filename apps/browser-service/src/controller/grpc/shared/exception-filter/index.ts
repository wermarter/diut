import { AllExceptionsFilter } from './all'
import { DomainExceptionFilter } from './domain'

// execution order: bottom-up
export const exceptionFilters = [AllExceptionsFilter, DomainExceptionFilter]
