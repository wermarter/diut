import { Inject, Injectable } from '@nestjs/common'
import {
  SampleType,
  SampleTypeAction,
  AuthSubject,
  EntityData,
} from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  SAMPLETYPE_REPO_TOKEN,
  IAuthContext,
  ISampleTypeRepository,
} from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
import { SampleTypeValidateUseCase } from './validate'

@Injectable()
export class SampleTypeCreateUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(SAMPLETYPE_REPO_TOKEN)
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
