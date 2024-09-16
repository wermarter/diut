import { ModuleMetadata } from '@nestjs/common'

import { SamplePrintContext } from './print-strategy/context'
import { SamplePrintFormChungStrategy } from './print-strategy/form-chung'
import { SamplePrintFormHIVStrategy } from './print-strategy/form-hiv'
import { SamplePrintFormPapStrategy } from './print-strategy/form-pap'
import { SamplePrintFormSoiNhuomStrategy } from './print-strategy/form-soi-nhuom'
import { SamplePrintFormTDStrategy } from './print-strategy/form-td'
import { PrintFormAssertExistsUseCase } from './use-case/assert-exists'
import { PrintFormAuthorizePopulatesUseCase } from './use-case/authorize-populates'
import { PrintFormCreateUseCase } from './use-case/create'
import { PrintFormDeleteUseCase } from './use-case/delete'
import { PrintFormFindOneUseCase } from './use-case/find-one'
import { PrintFormSearchUseCase } from './use-case/search'
import { PrintFormUpdateUseCase } from './use-case/update'
import { PrintFormValidateUseCase } from './use-case/validate'

export const printFormMetadata: ModuleMetadata = {
  providers: [
    PrintFormCreateUseCase,
    PrintFormFindOneUseCase,
    PrintFormUpdateUseCase,
    PrintFormDeleteUseCase,
    PrintFormSearchUseCase,
    PrintFormAssertExistsUseCase,
    PrintFormValidateUseCase,
    PrintFormAuthorizePopulatesUseCase,

    SamplePrintContext,
    SamplePrintFormChungStrategy,
    SamplePrintFormPapStrategy,
    SamplePrintFormTDStrategy,
    SamplePrintFormHIVStrategy,
    SamplePrintFormSoiNhuomStrategy,
  ],
}
