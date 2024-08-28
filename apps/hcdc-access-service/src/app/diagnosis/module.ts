import { ModuleMetadata } from '@nestjs/common'
import { DiagnosisAssertExistsUseCase } from './use-case/assert-exists'
import { DiagnosisAuthorizePopulatesUseCase } from './use-case/authorize-populates'
import { DiagnosisCreateUseCase } from './use-case/create'
import { DiagnosisDeleteUseCase } from './use-case/delete'
import { DiagnosisFindOneUseCase } from './use-case/find-one'
import { DiagnosisSearchUseCase } from './use-case/search'
import { DiagnosisUpdateUseCase } from './use-case/update'
import { DiagnosisValidateUseCase } from './use-case/validate'

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
