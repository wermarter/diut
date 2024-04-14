import { Inject, Injectable } from '@nestjs/common'
import { SampleType, SampleTypeAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  SampleTypeRepositoryToken,
  IAuthContext,
  ISampleTypeRepository,
  EntityData,
  assertPermission,
} from 'src/domain'
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
