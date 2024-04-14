import { UseFilters } from '@nestjs/common'

import { exceptionFilters } from '../exception-filter'

export const GrpcController = () => {
  return UseFilters(...exceptionFilters)
}
