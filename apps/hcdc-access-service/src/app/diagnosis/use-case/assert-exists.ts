import { Inject, Injectable } from '@nestjs/common'
import { Diagnosis } from '@diut/hcdc'

import {
  DiagnosisRepositoryToken,
  EntityFindOneOptions,
  IDiagnosisRepository,
  EEntityNotFound,
} from 'src/domain'

@Injectable()
export class DiagnosisAssertExistsUseCase {
  constructor(
    @Inject(DiagnosisRepositoryToken)
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
