import { ModuleMetadata } from '@nestjs/common'
import { DiagnosisCreateUseCase } from './use-case/create'
import { DiagnosisFindOneUseCase } from './use-case/find-one'
import { DiagnosisUpdateUseCase } from './use-case/update'
import { DiagnosisDeleteUseCase } from './use-case/delete'
import { DiagnosisSearchUseCase } from './use-case/search'
import { DiagnosisAssertExistsUseCase } from './use-case/assert-exists'
import { DiagnosisValidateUseCase } from './use-case/validate'
import { DiagnosisAuthorizePopulatesUseCase } from './use-case/authorize-populates'

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
