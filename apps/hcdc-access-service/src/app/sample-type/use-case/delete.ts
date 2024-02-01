import { Inject, Injectable } from '@nestjs/common'

import { SampleTypeAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import {
  AuthContextToken,
  SampleTypeRepositoryToken,
  IAuthContext,
  ISampleTypeRepository,
} from 'src/domain/interface'
import { SampleTypeAssertExistsUseCase } from './assert-exists'

@Injectable()
export class SampleTypeDeleteUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(SampleTypeRepositoryToken)
    private readonly sampleTypeRepository: ISampleTypeRepository,
    private readonly sampleTypeAssertExistsUseCase: SampleTypeAssertExistsUseCase,
  ) {}

  async execute(input: { id: string }) {
    const entity = await this.sampleTypeAssertExistsUseCase.execute({
      _id: input.id,
    })
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.SampleType,
      SampleTypeAction.Delete,
      entity,
    )

    await this.sampleTypeRepository.deleteById(input.id)

    return entity
  }
}
