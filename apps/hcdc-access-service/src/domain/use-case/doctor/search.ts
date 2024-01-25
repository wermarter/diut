import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'

import {
  AuthContextToken,
  DoctorRepositoryToken,
  IAuthContext,
  IDoctorRepository,
  EntitySearchOptions,
} from 'src/domain/interface'
import { Doctor, DoctorAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import { DoctorAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class DoctorSearchUseCase {
  constructor(
    @Inject(DoctorRepositoryToken)
    private readonly doctorRepository: IDoctorRepository,
    @Inject(AuthContextToken)
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
          accessibleBy(ability, DoctorAction.Read).Doctor,
        ],
      },
    })

    return paginationResult
  }
}
