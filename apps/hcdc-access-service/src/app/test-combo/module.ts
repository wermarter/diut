import { ModuleMetadata } from '@nestjs/common'

import { TestComboCreateUseCase } from './use-case/create'
import { TestComboUpdateUseCase } from './use-case/update'
import { TestComboValidateUseCase } from './use-case/validate'
import { TestComboFindOneUseCase } from './use-case/find-one'
import { TestComboDeleteUseCase } from './use-case/delete'
import { TestComboSearchUseCase } from './use-case/search'
import { TestComboAssertExistsUseCase } from './use-case/assert-exists'
import { TestComboAuthorizePopulatesUseCase } from './use-case/authorize-populates'

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
