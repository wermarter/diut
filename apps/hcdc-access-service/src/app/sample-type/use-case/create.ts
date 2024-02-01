import { Inject, Injectable } from '@nestjs/common'

import {
  AuthContextToken,
  SampleTypeRepositoryToken,
  IAuthContext,
  ISampleTypeRepository,
} from 'src/domain/interface'
import { SampleType, SampleTypeAction, EntityData } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import { SampleTypeValidateUseCase } from './validate'

@Injectable()
export class SampleTypeCreateUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(SampleTypeRepositoryToken)
    private readonly sampleTypeRepository: ISampleTypeRepository,
    private readonly sampleTypeValidateUseCase: SampleTypeValidateUseCase,
  ) {}

  async execute(input: EntityData<SampleType>) {
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.SampleType,
      SampleTypeAction.Create,
      input,
    )
    await this.sampleTypeValidateUseCase.execute(input)

    const entity = await this.sampleTypeRepository.create(input)

    return entity
  }
}
