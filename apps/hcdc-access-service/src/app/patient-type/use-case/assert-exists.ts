import { Inject, Injectable } from '@nestjs/common'
import { PatientType } from '@diut/hcdc'

import {
  PATIENTTYPE_REPO_TOKEN,
  EntityFindOneOptions,
  IPatientTypeRepository,
  EEntityNotFound,
} from 'src/domain'

@Injectable()
export class PatientTypeAssertExistsUseCase {
  constructor(
    @Inject(PATIENTTYPE_REPO_TOKEN)
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
