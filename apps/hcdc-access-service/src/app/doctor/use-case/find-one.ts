import { AuthSubject, Doctor, DoctorAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  DOCTOR_REPO_TOKEN,
  EntityFindOneOptions,
  IAuthContext,
  IDoctorRepository,
} from 'src/domain'
import { DoctorAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class DoctorFindOneUseCase {
  constructor(
    @Inject(DOCTOR_REPO_TOKEN)
    private readonly doctorRepository: IDoctorRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
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
