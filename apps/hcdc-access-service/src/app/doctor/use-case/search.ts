import { accessibleBy } from '@casl/mongoose'
import { AuthSubject, Doctor, DoctorAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  DOCTOR_REPO_TOKEN,
  EntitySearchOptions,
  IAuthContext,
  IDoctorRepository,
} from 'src/domain'
import { DoctorAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class DoctorSearchUseCase {
  constructor(
    @Inject(DOCTOR_REPO_TOKEN)
    private readonly doctorRepository: IDoctorRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly doctorAuthorizePopulatesUseCase: DoctorAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntitySearchOptions<Doctor>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Doctor, DoctorAction.Read)
    input.populates = this.doctorAuthorizePopulatesUseCase.execute(
      input.populates,
    )

    const paginationResult = await this.doctorRepository.search({
      ...input,
      filter: {
        $and: [
          input.filter ?? {},
          accessibleBy(ability, DoctorAction.Read).ofType(AuthSubject.Doctor),
        ],
      },
    })

    return paginationResult
  }
}
