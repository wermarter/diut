import { Inject, Injectable } from '@nestjs/common'
import { DoctorAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  DOCTOR_REPO_TOKEN,
  IAuthContext,
  IDoctorRepository,
} from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
import { DoctorAssertExistsUseCase } from './assert-exists'
import { DoctorValidateUseCase } from './validate'

@Injectable()
export class DoctorUpdateUseCase {
  constructor(
    @Inject(DOCTOR_REPO_TOKEN)
    private readonly doctorRepository: IDoctorRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly doctorAssertExistsUseCase: DoctorAssertExistsUseCase,
    private readonly doctorValidateUseCase: DoctorValidateUseCase,
  ) {}

  async execute(...input: Parameters<IDoctorRepository['update']>) {
    const entity = await this.doctorAssertExistsUseCase.execute(input[0])
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Doctor, DoctorAction.Update, entity)
    await this.doctorValidateUseCase.execute(input[1])

    return this.doctorRepository.update(...input)
  }
}
