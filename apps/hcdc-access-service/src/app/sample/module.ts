import { ModuleMetadata } from '@nestjs/common'
import { SampleAssertExistsUseCase } from './use-case/assert-exists'
import { SampleAuthorizePopulatesUseCase } from './use-case/authorize-populates'
import { SampleCreateUseCase } from './use-case/create'
import { SampleDeleteUseCase } from './use-case/delete'
import { SampleDeleteManyUseCase } from './use-case/delete-many'
import { SampleDownloadResultImageUseCase } from './use-case/download-result-image'
import { SampleFindOneUseCase } from './use-case/find-one'
import { SampleGeneratePrintUrlUseCase } from './use-case/generate-print-url'
import { SampleInitResultUseCase } from './use-case/init-result'
import { SamplePrintUseCase } from './use-case/print'
import { SampleSearchUseCase } from './use-case/search'
import { SampleUpdateUseCase } from './use-case/update'
import { SampleUpdateInfoUseCase } from './use-case/update-info'
import { SampleUpdateResultUseCase } from './use-case/update-result'
import { SampleUploadResultImageUseCase } from './use-case/upload-result-image'
import { SampleValidateUseCase } from './use-case/validate'

export const sampleMetadata: ModuleMetadata = {
  providers: [
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
