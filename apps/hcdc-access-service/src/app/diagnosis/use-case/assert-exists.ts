import { Inject, Injectable } from '@nestjs/common'

import { Diagnosis } from 'src/domain/entity'
import { EEntityNotFound } from 'src/domain/exception'
import {
  DiagnosisRepositoryToken,
  EntityFindOneOptions,
  IDiagnosisRepository,
} from 'src/domain/interface'

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
