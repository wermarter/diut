import { Inject, Injectable } from '@nestjs/common'
import { Doctor, DoctorAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  DoctorRepositoryToken,
  EntityFindOneOptions,
  IAuthContext,
  IDoctorRepository,
  assertPermission,
} from 'src/domain'
import { DoctorAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class DoctorFindOneUseCase {
  constructor(
    @Inject(DoctorRepositoryToken)
    private readonly doctorRepository: IDoctorRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly doctorAuthorizePopulatesUseCase: DoctorAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntityFindOneOptions<Doctor>) {
    input.populates = this.doctorAuthorizePopulatesUseCase.execute(
      input.populates,
    )
    const entity = await this.doctorRepository.findOne(input)
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Doctor, DoctorAction.Read, entity)

    return entity
  }
}
