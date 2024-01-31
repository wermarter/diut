import { ModuleMetadata } from '@nestjs/common'

import { PrintFormCreateUseCase } from './create'
import { PrintFormFindOneUseCase } from './find-one'
import { PrintFormUpdateUseCase } from './update'
import { PrintFormDeleteUseCase } from './delete'
import { PrintFormSearchUseCase } from './search'
import { PrintFormAssertExistsUseCase } from './assert-exists'
import { PrintFormValidateUseCase } from './validate'
import { PrintFormAuthorizePopulatesUseCase } from './authorize-populates'

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
