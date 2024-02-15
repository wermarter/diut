import { Inject, Injectable } from '@nestjs/common'
import { Doctor, DoctorAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  DoctorRepositoryToken,
  IAuthContext,
  IDoctorRepository,
  EntityData,
  assertPermission,
} from 'src/domain'
import { DoctorValidateUseCase } from './validate'

@Injectable()
export class DoctorCreateUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(DoctorRepositoryToken)
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
