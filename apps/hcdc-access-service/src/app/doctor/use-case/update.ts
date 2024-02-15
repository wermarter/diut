import { Inject, Injectable } from '@nestjs/common'
import { DoctorAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  DoctorRepositoryToken,
  IAuthContext,
  IDoctorRepository,
  assertPermission,
} from 'src/domain'
import { DoctorAssertExistsUseCase } from './assert-exists'
import { DoctorValidateUseCase } from './validate'

@Injectable()
export class DoctorUpdateUseCase {
  constructor(
    @Inject(DoctorRepositoryToken)
    private readonly doctorRepository: IDoctorRepository,
    @Inject(AuthContextToken)
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
