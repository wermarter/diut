import { Inject, Injectable } from '@nestjs/common'
import { Doctor, DoctorAction, AuthSubject, EntityData } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  DOCTOR_REPO_TOKEN,
  IAuthContext,
  IDoctorRepository,
} from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
import { DoctorValidateUseCase } from './validate'

@Injectable()
export class DoctorCreateUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(DOCTOR_REPO_TOKEN)
    private readonly doctorRepository: IDoctorRepository,
    private readonly doctorValidateUseCase: DoctorValidateUseCase,
  ) {}

  async execute(input: EntityData<Doctor>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Doctor, DoctorAction.Create, input)
    await this.doctorValidateUseCase.execute(input)

    const entity = await this.doctorRepository.create(input)

    return entity
  }
}
