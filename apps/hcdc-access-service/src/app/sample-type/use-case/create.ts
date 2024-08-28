import {
  AuthSubject,
  EntityData,
  SampleType,
  SampleTypeAction,
} from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  IAuthContext,
  ISampleTypeRepository,
  SAMPLETYPE_REPO_TOKEN,
} from 'src/domain'
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
