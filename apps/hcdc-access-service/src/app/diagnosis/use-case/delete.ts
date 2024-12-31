import { AuthSubject, Diagnosis, DiagnosisAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { FilterQuery } from 'mongoose'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  DIAGNOSIS_REPO_TOKEN,
  EEntityCannotDelete,
  IAuthContext,
  IDiagnosisRepository,
  ISampleRepository,
  SAMPLE_REPO_TOKEN,
} from 'src/domain'
import { DiagnosisSearchUseCase } from './search'

@Injectable()
export class DiagnosisDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(DIAGNOSIS_REPO_TOKEN)
    private readonly diagnosisRepository: IDiagnosisRepository,
    @Inject(SAMPLE_REPO_TOKEN)
    private readonly sampleRepository: ISampleRepository,
    private readonly diagnosisSearchUseCase: DiagnosisSearchUseCase,
  ) {}

  async execute(input: FilterQuery<Diagnosis>) {
    const { ability } = this.authContext.getData()
    const { items: diagnoses } = await this.diagnosisSearchUseCase.execute({
      filter: input,
    })

    for (const diagnosis of diagnoses) {
      assertPermission(
        ability,
        AuthSubject.Diagnosis,
        DiagnosisAction.Delete,
        diagnosis,
      )

      const connectedSampleCount = await this.sampleRepository.count({
        diagnosisId: diagnosis._id,
      })
      if (connectedSampleCount > 0) {
        throw new EEntityCannotDelete(
          `${connectedSampleCount} connected Sample`,
        )
      }

      await this.diagnosisRepository.deleteById(diagnosis._id)
    }
  }
}
