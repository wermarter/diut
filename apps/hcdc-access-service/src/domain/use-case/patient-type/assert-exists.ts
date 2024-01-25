import { Inject, Injectable } from '@nestjs/common'

import { PatientType } from 'src/domain/entity'
import { EEntityNotFound } from 'src/domain/exception'
import {
  PatientTypeRepositoryToken,
  EntityFindOneOptions,
  IPatientTypeRepository,
} from 'src/domain/interface'

@Injectable()
export class PatientTypeAssertExistsUseCase {
  constructor(
    @Inject(PatientTypeRepositoryToken)
    private readonly patientTypeRepository: IPatientTypeRepository,
  ) {}

  async execute(input: EntityFindOneOptions<PatientType>['filter']) {
    const rv = await this.patientTypeRepository.findOne({ filter: input })

    if (rv === null) {
      throw new EEntityNotFound(`PatientType ${JSON.stringify(input)}`)
    }

    return rv
  }
}
