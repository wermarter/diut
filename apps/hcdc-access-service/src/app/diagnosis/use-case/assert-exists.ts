import { Diagnosis } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import {
  DIAGNOSIS_REPO_TOKEN,
  EEntityNotFound,
  EntityFindOneOptions,
  IDiagnosisRepository,
} from 'src/domain'

@Injectable()
export class DiagnosisAssertExistsUseCase {
  constructor(
    @Inject(DIAGNOSIS_REPO_TOKEN)
    private readonly diagnosisRepository: IDiagnosisRepository,
  ) {}

  async execute(input: EntityFindOneOptions<Diagnosis>['filter']) {
    const rv = await this.diagnosisRepository.findOne({ filter: input })

    if (rv === null) {
      throw new EEntityNotFound(`Diagnosis ${JSON.stringify(input)}`)
    }

    return rv
  }
}
