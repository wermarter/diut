import { ModuleMetadata } from '@nestjs/common'

import { SampleCreateUseCase } from './use-case/create'
import { SampleUpdateUseCase } from './use-case/update'
import { SampleUpdateInfoUseCase } from './use-case/update-info'
import { SampleUpdateResultUseCase } from './use-case/update-result'
import { SampleValidateUseCase } from './use-case/validate'
import { SampleFindOneUseCase } from './use-case/find-one'
import { SampleDeleteUseCase } from './use-case/delete'
import { SampleDeleteManyUseCase } from './use-case/delete-many'
import { SampleSearchUseCase } from './use-case/search'
import { SampleAssertExistsUseCase } from './use-case/assert-exists'
import { SampleAuthorizePopulatesUseCase } from './use-case/authorize-populates'
import { SampleInitResultUseCase } from './use-case/init-result'
import { SamplePrintUseCase } from './use-case/print'
import { SampleUploadResultImageUseCase } from './use-case/upload-result-image'
import { SampleDownloadResultImageUseCase } from './use-case/download-result-image'
import { SamplePrintContext } from './print-strategy/context'
import { SamplePrintFormChungStrategy } from './print-strategy/form-chung'
import { SamplePrintFormPapStrategy } from './print-strategy/form-pap'
import { SamplePrintFormTDStrategy } from './print-strategy/form-td'
import { SamplePrintFormHIVStrategy } from './print-strategy/form-hiv'
import { SamplePrintFormSoiNhuomStrategy } from './print-strategy/form-soi-nhuom'
import { SampleGeneratePrintUrlUseCase } from './use-case/generate-print-url'

export const sampleMetadata: ModuleMetadata = {
  providers: [
    SamplePrintContext,
    SamplePrintFormChungStrategy,
    SamplePrintFormPapStrategy,
    SamplePrintFormTDStrategy,
    SamplePrintFormHIVStrategy,
    SamplePrintFormSoiNhuomStrategy,

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
    SampleInitResultUseCase,
    SamplePrintUseCase,
    SampleUploadResultImageUseCase,
    SampleDownloadResultImageUseCase,
    SampleGeneratePrintUrlUseCase,
  ],
}
