import { ModuleMetadata } from '@nestjs/common'

import { PrintFormCreateUseCase } from './use-case/create'
import { PrintFormFindOneUseCase } from './use-case/find-one'
import { PrintFormUpdateUseCase } from './use-case/update'
import { PrintFormDeleteUseCase } from './use-case/delete'
import { PrintFormSearchUseCase } from './use-case/search'
import { PrintFormAssertExistsUseCase } from './use-case/assert-exists'
import { PrintFormValidateUseCase } from './use-case/validate'
import { PrintFormAuthorizePopulatesUseCase } from './use-case/authorize-populates'

export const printFormMetadata: ModuleMetadata = {
  providers: [
    PrintFormCreateUseCase,
    PrintFormFindOneUseCase,
    PrintFormUpdateUseCase,
    PrintFormDeleteUseCase,
    PrintFormSearchUseCase,
    PrintFormAssertExistsUseCase,
    PrintFormValidateUseCase,
    PrintFormAuthorizePopulatesUseCase,
  ],
}
