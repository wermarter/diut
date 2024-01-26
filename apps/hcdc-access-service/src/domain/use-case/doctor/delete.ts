import { Inject, Injectable } from '@nestjs/common'

import { DoctorAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import {
  AuthContextToken,
  DoctorRepositoryToken,
  IAuthContext,
  IDoctorRepository,
} from 'src/domain/interface'
import { DoctorAssertExistsUseCase } from './assert-exists'

@Injectable()
export class DoctorDeleteUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(DoctorRepositoryToken)
    private readonly doctorRepository: IDoctorRepository,
    private readonly doctorAssertExistsUseCase: DoctorAssertExistsUseCase,
  ) {}

  async execute(input: { id: string }) {
    const entity = await this.doctorAssertExistsUseCase.execute({
      _id: input.id,
    })
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Doctor, DoctorAction.Delete, entity)

    await this.doctorRepository.deleteById(input.id)

    return entity
  }
}