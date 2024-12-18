import { Patient } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import {
  EEntityNotFound,
  EntityFindOneOptions,
  IPatientRepository,
  PATIENT_REPO_TOKEN,
} from 'src/domain'

@Injectable()
export class PatientAssertExistsUseCase {
  constructor(
    @Inject(PATIENT_REPO_TOKEN)
    private readonly patientRepository: IPatientRepository,
  ) {}

  async execute(input: EntityFindOneOptions<Patient>['filter']) {
    const rv = await this.patientRepository.findOne({ filter: input })

    if (rv === null) {
      throw new EEntityNotFound(`Patient ${JSON.stringify(input)}`)
    }

    return rv
  }
}
