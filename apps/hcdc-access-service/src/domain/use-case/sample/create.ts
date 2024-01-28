import { Inject, Injectable } from '@nestjs/common'

import {
  AuthContextToken,
  SampleRepositoryToken,
  IAuthContext,
  ISampleRepository,
} from 'src/domain/interface'
import { Sample, SampleAction, EntityData } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import { SampleValidateUseCase } from './validate'

@Injectable()
export class SampleCreateUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(SampleRepositoryToken)
    private readonly sampleRepository: ISampleRepository,
    private readonly sampleValidateUseCase: SampleValidateUseCase,
  ) {}

  async execute(input: EntityData<Sample>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Sample, SampleAction.Create, input)
    await this.sampleValidateUseCase.execute(input)

    const entity = await this.sampleRepository.create(input)

    return entity
  }
}
