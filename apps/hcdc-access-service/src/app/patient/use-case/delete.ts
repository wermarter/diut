import { AuthSubject, Patient, PatientAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { FilterQuery } from 'mongoose'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  IAuthContext,
  IPatientRepository,
  PATIENT_REPO_TOKEN,
} from 'src/domain'
import { SampleDeleteUseCase } from '../../sample/use-case/delete'
import { PatientSearchUseCase } from './search'

@Injectable()
export class PatientDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(PATIENT_REPO_TOKEN)
    private readonly patientRepository: IPatientRepository,
    private readonly patientSearchUseCase: PatientSearchUseCase,
    private readonly sampleDeleteUseCase: SampleDeleteUseCase,
  ) {}

  async execute(input: FilterQuery<Patient>) {
    const { ability } = this.authContext.getData()
    const { items: patients } = await this.patientSearchUseCase.execute({
      filter: input,
    })

    for (const patient of patients) {
      assertPermission(
        ability,
        AuthSubject.Patient,
        PatientAction.Delete,
        patient,
      )

      // TODO: DB transaction
      await this.sampleDeleteUseCase.execute({ patientId: patient._id })
      await this.patientRepository.deleteById(patient._id)
    }
  }
}
