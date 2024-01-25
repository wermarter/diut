import { ModuleMetadata } from '@nestjs/common'

import { BioProductCreateUseCase } from './bio-product/create'
import { BioProductUpdateUseCase } from './bio-product/update'
import { BioProductValidateUseCase } from './bio-product/validate'
import { BioProductFindOneUseCase } from './bio-product/find-one'
import { BioProductDeleteUseCase } from './bio-product/delete'
import { BioProductSearchUseCase } from './bio-product/search'
import { BioProductAssertExistsUseCase } from './bio-product/assert-exists'
import { BioProductAuthorizePopulatesUseCase } from './bio-product/authorize-populates'

import { SampleTypeCreateUseCase } from './sample-type/create'
import { SampleTypeUpdateUseCase } from './sample-type/update'
import { SampleTypeValidateUseCase } from './sample-type/validate'
import { SampleTypeFindOneUseCase } from './sample-type/find-one'
import { SampleTypeDeleteUseCase } from './sample-type/delete'
import { SampleTypeSearchUseCase } from './sample-type/search'
import { SampleTypeAssertExistsUseCase } from './sample-type/assert-exists'
import { SampleTypeAuthorizePopulatesUseCase } from './sample-type/authorize-populates'

import { InstrumentCreateUseCase } from './instrument/create'
import { InstrumentUpdateUseCase } from './instrument/update'
import { InstrumentValidateUseCase } from './instrument/validate'
import { InstrumentFindOneUseCase } from './instrument/find-one'
import { InstrumentDeleteUseCase } from './instrument/delete'
import { InstrumentSearchUseCase } from './instrument/search'
import { InstrumentAssertExistsUseCase } from './instrument/assert-exists'
import { InstrumentAuthorizePopulatesUseCase } from './instrument/authorize-populates'

import { TestCategoryCreateUseCase } from './test-category/create'
import { TestCategoryUpdateUseCase } from './test-category/update'
import { TestCategoryValidateUseCase } from './test-category/validate'
import { TestCategoryFindOneUseCase } from './test-category/find-one'
import { TestCategoryDeleteUseCase } from './test-category/delete'
import { TestCategorySearchUseCase } from './test-category/search'
import { TestCategoryAssertExistsUseCase } from './test-category/assert-exists'
import { TestCategoryAuthorizePopulatesUseCase } from './test-category/authorize-populates'

import { RoleCreateUseCase } from './role/create'
import { RoleUpdateUseCase } from './role/update'
import { RoleFindOneUseCase } from './role/find-one'
import { RoleDeleteUseCase } from './role/delete'
import { RoleSearchUseCase } from './role/search'
import { RoleAssertExistsUseCase } from './role/assert-exists'
import { RoleValidateUseCase } from './role/validate'
import { RoleAuthorizePopulatesUseCase } from './role/authorize-populates'

import { BranchCreateUseCase } from './branch/create'
import { BranchUpdateUseCase } from './branch/update'
import { BranchValidateUseCase } from './branch/validate'
import { BranchFindOneUseCase } from './branch/find-one'
import { BranchDeleteUseCase } from './branch/delete'
import { BranchSearchUseCase } from './branch/search'
import { BranchAssertExistsUseCase } from './branch/assert-exists'
import { BranchAuthorizePopulatesUseCase } from './branch/authorize-populates'

import { UserCreateUseCase } from './user/create'
import { UserUpdateUseCase } from './user/update'
import { UserFindOneUseCase } from './user/find-one'
import { UserDeleteUseCase } from './user/delete'
import { UserSearchUseCase } from './user/search'
import { UserAssertExistsUseCase } from './user/assert-exists'
import { UserValidateUseCase } from './user/validate'
import { UserAuthorizePopulatesUseCase } from './user/authorize-populates'
import { UserChangePasswordUseCase } from './user/change-password'

import { AuthMeUseCase } from './auth/me'
import { AuthLoginUseCase } from './auth/login'
import { AuthPopulateContextUseCase } from './auth/populate-context'

export const useCaseMetadata: ModuleMetadata = {
  providers: [
    AuthMeUseCase,
    AuthLoginUseCase,
    AuthPopulateContextUseCase,

    UserFindOneUseCase,

    BioProductCreateUseCase,
    BioProductFindOneUseCase,
    BioProductUpdateUseCase,
    BioProductDeleteUseCase,
    BioProductSearchUseCase,
    BioProductAssertExistsUseCase,
    BioProductValidateUseCase,
    BioProductAuthorizePopulatesUseCase,

    SampleTypeCreateUseCase,
    SampleTypeFindOneUseCase,
    SampleTypeUpdateUseCase,
    SampleTypeDeleteUseCase,
    SampleTypeSearchUseCase,
    SampleTypeAssertExistsUseCase,
    SampleTypeValidateUseCase,
    SampleTypeAuthorizePopulatesUseCase,

    InstrumentCreateUseCase,
    InstrumentFindOneUseCase,
    InstrumentUpdateUseCase,
    InstrumentDeleteUseCase,
    InstrumentSearchUseCase,
    InstrumentAssertExistsUseCase,
    InstrumentValidateUseCase,
    InstrumentAuthorizePopulatesUseCase,

    TestCategoryCreateUseCase,
    TestCategoryFindOneUseCase,
    TestCategoryUpdateUseCase,
    TestCategoryDeleteUseCase,
    TestCategorySearchUseCase,
    TestCategoryAssertExistsUseCase,
    TestCategoryValidateUseCase,
    TestCategoryAuthorizePopulatesUseCase,

    BranchCreateUseCase,
    BranchFindOneUseCase,
    BranchUpdateUseCase,
    BranchDeleteUseCase,
    BranchSearchUseCase,
    BranchAssertExistsUseCase,
    BranchValidateUseCase,
    BranchAuthorizePopulatesUseCase,

    RoleCreateUseCase,
    RoleFindOneUseCase,
    RoleUpdateUseCase,
    RoleDeleteUseCase,
    RoleSearchUseCase,
    RoleAssertExistsUseCase,
    RoleValidateUseCase,
    RoleAuthorizePopulatesUseCase,

    UserCreateUseCase,
    UserFindOneUseCase,
    UserUpdateUseCase,
    UserDeleteUseCase,
    UserSearchUseCase,
    UserAssertExistsUseCase,
    UserValidateUseCase,
    UserAuthorizePopulatesUseCase,
    UserChangePasswordUseCase,
  ],
}
