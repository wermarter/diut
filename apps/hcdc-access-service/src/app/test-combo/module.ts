import { ModuleMetadata } from '@nestjs/common'

import { TestComboCreateUseCase } from './create'
import { TestComboUpdateUseCase } from './update'
import { TestComboValidateUseCase } from './validate'
import { TestComboFindOneUseCase } from './find-one'
import { TestComboDeleteUseCase } from './delete'
import { TestComboSearchUseCase } from './search'
import { TestComboAssertExistsUseCase } from './assert-exists'
import { TestComboAuthorizePopulatesUseCase } from './authorize-populates'

export const testComboMetadata: ModuleMetadata = {
  providers: [
    TestComboCreateUseCase,
    TestComboFindOneUseCase,
    TestComboUpdateUseCase,
    TestComboDeleteUseCase,
    TestComboSearchUseCase,
    TestComboAssertExistsUseCase,
    TestComboValidateUseCase,
    TestComboAuthorizePopulatesUseCase,
  ],
}
