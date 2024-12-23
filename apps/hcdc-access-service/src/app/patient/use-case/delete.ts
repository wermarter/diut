import { AuthSubject, PatientAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  IAuthContext,
  IPatientRepository,
  PATIENT_REPO_TOKEN,
} from 'src/domain'
import { SampleDeleteManyUseCase } from '../../sample/use-case/delete-many'
import { PatientAssertExistsUseCase } from './assert-exists'

@Injectable()
export class PatientDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(PATIENT_REPO_TOKEN)
    private readonly patientRepository: IPatientRepository,
    private readonly patientAssertExistsUseCase: PatientAssertExistsUseCase,
    private readonly sampleDeleteManyUseCase: SampleDeleteManyUseCase,
  ) {}

  async execute(input: { id: string }) {
    const entity = await this.patientAssertExistsUseCase.execute({
      _id: input.id,
    })
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Patient, PatientAction.Delete, entity)

    // TODO: DB transaction
    await this.sampleDeleteManyUseCase.execute({ patientId: input.id })
    await this.patientRepository.deleteById(input.id)

    return entity
  }
}
