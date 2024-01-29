import { ModuleMetadata } from '@nestjs/common'

import { BioProductCreateUseCase } from './bio-product/create'
import { BioProductUpdateUseCase } from './bio-product/update'
import { BioProductValidateUseCase } from './bio-product/validate'
import { BioProductFindOneUseCase } from './bio-product/find-one'
import { BioProductDeleteUseCase } from './bio-product/delete'
import { BioProductSearchUseCase } from './bio-product/search'
import { BioProductAssertExistsUseCase } from './bio-product/assert-exists'
import { BioProductAuthorizePopulatesUseCase } from './bio-product/authorize-populates'

import { TestElementCreateUseCase } from './test-element/create'
import { TestElementUpdateUseCase } from './test-element/update'
import { TestElementValidateUseCase } from './test-element/validate'
import { TestElementFindOneUseCase } from './test-element/find-one'
import { TestElementDeleteUseCase } from './test-element/delete'
import { TestElementSearchUseCase } from './test-element/search'
import { TestElementAssertExistsUseCase } from './test-element/assert-exists'
import { TestElementAuthorizePopulatesUseCase } from './test-element/authorize-populates'

import { PatientCreateUseCase } from './patient/create'
import { PatientUpdateUseCase } from './patient/update'
import { PatientValidateUseCase } from './patient/validate'
import { PatientFindOneUseCase } from './patient/find-one'
import { PatientDeleteUseCase } from './patient/delete'
import { PatientSearchUseCase } from './patient/search'
import { PatientAssertExistsUseCase } from './patient/assert-exists'
import { PatientAuthorizePopulatesUseCase } from './patient/authorize-populates'
import { PatientGetCategoryUseCase } from './patient/get-category'

import { PrintFormCreateUseCase } from './print-form/create'
import { PrintFormUpdateUseCase } from './print-form/update'
import { PrintFormValidateUseCase } from './print-form/validate'
import { PrintFormFindOneUseCase } from './print-form/find-one'
import { PrintFormDeleteUseCase } from './print-form/delete'
import { PrintFormSearchUseCase } from './print-form/search'
import { PrintFormAssertExistsUseCase } from './print-form/assert-exists'
import { PrintFormAuthorizePopulatesUseCase } from './print-form/authorize-populates'

import { TestCreateUseCase } from './test/create'
import { TestUpdateUseCase } from './test/update'
import { TestValidateUseCase } from './test/validate'
import { TestFindOneUseCase } from './test/find-one'
import { TestDeleteUseCase } from './test/delete'
import { TestSearchUseCase } from './test/search'
import { TestAssertExistsUseCase } from './test/assert-exists'
import { TestAuthorizePopulatesUseCase } from './test/authorize-populates'

import { TestComboCreateUseCase } from './test-combo/create'
import { TestComboUpdateUseCase } from './test-combo/update'
import { TestComboValidateUseCase } from './test-combo/validate'
import { TestComboFindOneUseCase } from './test-combo/find-one'
import { TestComboDeleteUseCase } from './test-combo/delete'
import { TestComboSearchUseCase } from './test-combo/search'
import { TestComboAssertExistsUseCase } from './test-combo/assert-exists'
import { TestComboAuthorizePopulatesUseCase } from './test-combo/authorize-populates'

import { SampleCreateUseCase } from './sample/create'
import { SampleUpdateUseCase } from './sample/update'
import { SampleUpdateInfoUseCase } from './sample/update-info'
import { SampleUpdateResultUseCase } from './sample/update-result'
import { SampleValidateUseCase } from './sample/validate'
import { SampleFindOneUseCase } from './sample/find-one'
import { SampleDeleteUseCase } from './sample/delete'
import { SampleDeleteManyUseCase } from './sample/delete-many'
import { SampleSearchUseCase } from './sample/search'
import { SampleAssertExistsUseCase } from './sample/assert-exists'
import { SampleAuthorizePopulatesUseCase } from './sample/authorize-populates'

import { PatientTypeCreateUseCase } from './patient-type/create'
import { PatientTypeUpdateUseCase } from './patient-type/update'
import { PatientTypeValidateUseCase } from './patient-type/validate'
import { PatientTypeFindOneUseCase } from './patient-type/find-one'
import { PatientTypeDeleteUseCase } from './patient-type/delete'
import { PatientTypeSearchUseCase } from './patient-type/search'
import { PatientTypeAssertExistsUseCase } from './patient-type/assert-exists'
import { PatientTypeAuthorizePopulatesUseCase } from './patient-type/authorize-populates'

import { DiagnosisCreateUseCase } from './diagnosis/create'
import { DiagnosisUpdateUseCase } from './diagnosis/update'
import { DiagnosisValidateUseCase } from './diagnosis/validate'
import { DiagnosisFindOneUseCase } from './diagnosis/find-one'
import { DiagnosisDeleteUseCase } from './diagnosis/delete'
import { DiagnosisSearchUseCase } from './diagnosis/search'
import { DiagnosisAssertExistsUseCase } from './diagnosis/assert-exists'
import { DiagnosisAuthorizePopulatesUseCase } from './diagnosis/authorize-populates'

import { DoctorCreateUseCase } from './doctor/create'
import { DoctorUpdateUseCase } from './doctor/update'
import { DoctorValidateUseCase } from './doctor/validate'
import { DoctorFindOneUseCase } from './doctor/find-one'
import { DoctorDeleteUseCase } from './doctor/delete'
import { DoctorSearchUseCase } from './doctor/search'
import { DoctorAssertExistsUseCase } from './doctor/assert-exists'
import { DoctorAuthorizePopulatesUseCase } from './doctor/authorize-populates'

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

    TestElementCreateUseCase,
    TestElementFindOneUseCase,
    TestElementUpdateUseCase,
    TestElementDeleteUseCase,
    TestElementSearchUseCase,
    TestElementAssertExistsUseCase,
    TestElementValidateUseCase,
    TestElementAuthorizePopulatesUseCase,

    TestComboCreateUseCase,
    TestComboFindOneUseCase,
    TestComboUpdateUseCase,
    TestComboDeleteUseCase,
    TestComboSearchUseCase,
    TestComboAssertExistsUseCase,
    TestComboValidateUseCase,
    TestComboAuthorizePopulatesUseCase,

    SampleCreateUseCase,
    SampleFindOneUseCase,
    SampleUpdateUseCase,
    SampleUpdateInfoUseCase,
    SampleUpdateResultUseCase,
    SampleDeleteUseCase,
    SampleDeleteManyUseCase,
    SampleSearchUseCase,
    SampleAssertExistsUseCase,
    SampleValidateUseCase,
    SampleAuthorizePopulatesUseCase,

    PatientCreateUseCase,
    PatientFindOneUseCase,
    PatientUpdateUseCase,
    PatientDeleteUseCase,
    PatientSearchUseCase,
    PatientAssertExistsUseCase,
    PatientValidateUseCase,
    PatientAuthorizePopulatesUseCase,
    PatientGetCategoryUseCase,

    PrintFormCreateUseCase,
    PrintFormFindOneUseCase,
    PrintFormUpdateUseCase,
    PrintFormDeleteUseCase,
    PrintFormSearchUseCase,
    PrintFormAssertExistsUseCase,
    PrintFormValidateUseCase,
    PrintFormAuthorizePopulatesUseCase,

    TestCreateUseCase,
    TestFindOneUseCase,
    TestUpdateUseCase,
    TestDeleteUseCase,
    TestSearchUseCase,
    TestAssertExistsUseCase,
    TestValidateUseCase,
    TestAuthorizePopulatesUseCase,

    PatientTypeCreateUseCase,
    PatientTypeFindOneUseCase,
    PatientTypeUpdateUseCase,
    PatientTypeDeleteUseCase,
    PatientTypeSearchUseCase,
    PatientTypeAssertExistsUseCase,
    PatientTypeValidateUseCase,
    PatientTypeAuthorizePopulatesUseCase,

    DiagnosisCreateUseCase,
    DiagnosisFindOneUseCase,
    DiagnosisUpdateUseCase,
    DiagnosisDeleteUseCase,
    DiagnosisSearchUseCase,
    DiagnosisAssertExistsUseCase,
    DiagnosisValidateUseCase,
    DiagnosisAuthorizePopulatesUseCase,

    DoctorCreateUseCase,
    DoctorFindOneUseCase,
    DoctorUpdateUseCase,
    DoctorDeleteUseCase,
    DoctorSearchUseCase,
    DoctorAssertExistsUseCase,
    DoctorValidateUseCase,
    DoctorAuthorizePopulatesUseCase,

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
