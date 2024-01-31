import { ModuleMetadata } from '@nestjs/common'
import { DiagnosisCreateUseCase } from './create'
import { DiagnosisFindOneUseCase } from './find-one'
import { DiagnosisUpdateUseCase } from './update'
import { DiagnosisDeleteUseCase } from './delete'
import { DiagnosisSearchUseCase } from './search'
import { DiagnosisAssertExistsUseCase } from './assert-exists'
import { DiagnosisValidateUseCase } from './validate'
import { DiagnosisAuthorizePopulatesUseCase } from './authorize-populates'

export const diagnosisMetadata: ModuleMetadata = {
  providers: [
    DiagnosisCreateUseCase,
    DiagnosisFindOneUseCase,
    DiagnosisUpdateUseCase,
    DiagnosisDeleteUseCase,
    DiagnosisSearchUseCase,
    DiagnosisAssertExistsUseCase,
    DiagnosisValidateUseCase,
    DiagnosisAuthorizePopulatesUseCase,
  ],
}
