import { ModuleMetadata } from '@nestjs/common'

import { TestElementCreateUseCase } from './create'
import { TestElementUpdateUseCase } from './update'
import { TestElementValidateUseCase } from './validate'
import { TestElementFindOneUseCase } from './find-one'
import { TestElementDeleteUseCase } from './delete'
import { TestElementSearchUseCase } from './search'
import { TestElementAssertExistsUseCase } from './assert-exists'
import { TestElementAuthorizePopulatesUseCase } from './authorize-populates'

export const testElementMetadata: ModuleMetadata = {
  providers: [
    TestElementCreateUseCase,
    TestElementFindOneUseCase,
    TestElementUpdateUseCase,
    TestElementDeleteUseCase,
    TestElementSearchUseCase,
    TestElementAssertExistsUseCase,
    TestElementValidateUseCase,
    TestElementAuthorizePopulatesUseCase,
  ],
}
