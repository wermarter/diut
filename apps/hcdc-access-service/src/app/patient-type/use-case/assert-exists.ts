import { Inject, Injectable } from '@nestjs/common'
import { PatientType } from '@diut/hcdc'

import {
  PatientTypeRepositoryToken,
  EntityFindOneOptions,
  IPatientTypeRepository,
  EEntityNotFound,
} from 'src/domain'

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
