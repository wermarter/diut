import { ModuleMetadata } from '@nestjs/common'
import { TestComboAssertExistsUseCase } from './use-case/assert-exists'
import { TestComboAuthorizePopulatesUseCase } from './use-case/authorize-populates'
import { TestComboCreateUseCase } from './use-case/create'
import { TestComboDeleteUseCase } from './use-case/delete'
import { TestComboFindOneUseCase } from './use-case/find-one'
import { TestComboSearchUseCase } from './use-case/search'
import { TestComboUpdateUseCase } from './use-case/update'
import { TestComboValidateUseCase } from './use-case/validate'

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
