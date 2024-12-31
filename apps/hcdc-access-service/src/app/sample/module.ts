import { ModuleMetadata } from '@nestjs/common'
import { SampleAssertExistsUseCase } from './use-case/assert-exists'
import { SampleAuthorizePopulatesUseCase } from './use-case/authorize-populates'
import { SampleCreateUseCase } from './use-case/create'
import { SampleDeleteUseCase } from './use-case/delete'
import { SampleDownloadResultImageUseCase } from './use-case/download-result-image'
import { SampleFindOneUseCase } from './use-case/find-one'
import { SampleGeneratePrintUrlUseCase } from './use-case/generate-print-url'
import { SampleInitResultUseCase } from './use-case/init-result'
import { SampleLockUseCase } from './use-case/lock'
import { SamplePrintUseCase } from './use-case/print'
import { SamplePrintReminderUseCase } from './use-case/print-reminder'
import { SampleSearchUseCase } from './use-case/search'
import { SampleUnlockUseCase } from './use-case/unlock'
import { SampleUpdateInfoUseCase } from './use-case/update-info'
import { SampleUpdateResultUseCase } from './use-case/update-result'
import { SampleUploadResultImageUseCase } from './use-case/upload-result-image'
import { SampleValidateUseCase } from './use-case/validate'

export const sampleMetadata: ModuleMetadata = {
  providers: [
    SampleCreateUseCase,
    SampleFindOneUseCase,
    SampleLockUseCase,
    SampleUnlockUseCase,
    SampleUpdateInfoUseCase,
    SampleUpdateResultUseCase,
    SampleDeleteUseCase,
    SampleSearchUseCase,
    SampleAssertExistsUseCase,
    SampleValidateUseCase,
    SampleAuthorizePopulatesUseCase,
    SampleInitResultUseCase,
    SamplePrintUseCase,
    SampleUploadResultImageUseCase,
    SampleDownloadResultImageUseCase,
    SampleGeneratePrintUrlUseCase,
    SamplePrintReminderUseCase,
  ],
}
