import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'
import { Doctor, DoctorAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  DOCTOR_REPO_TOKEN,
  IAuthContext,
  IDoctorRepository,
  EntitySearchOptions,
} from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
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
