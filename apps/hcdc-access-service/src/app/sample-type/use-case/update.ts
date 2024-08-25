import { Inject, Injectable } from '@nestjs/common'
import { SampleTypeAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  SAMPLETYPE_REPO_TOKEN,
  IAuthContext,
  ISampleTypeRepository,
} from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
import { SampleTypeAssertExistsUseCase } from './assert-exists'
import { SampleTypeValidateUseCase } from './validate'

@Injectable()
export class SampleTypeUpdateUseCase {
  constructor(
    @Inject(SAMPLETYPE_REPO_TOKEN)
    private readonly sampleTypeRepository: ISampleTypeRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly sampleTypeAssertExistsUseCase: SampleTypeAssertExistsUseCase,
    private readonly sampleTypeValidateUseCase: SampleTypeValidateUseCase,
  ) {}

  async execute(...input: Parameters<ISampleTypeRepository['update']>) {
    const entity = await this.sampleTypeAssertExistsUseCase.execute(input[0])
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.SampleType,
      SampleTypeAction.Update,
      entity,
    )
    await this.sampleTypeValidateUseCase.execute(input[1])

    return this.sampleTypeRepository.update(...input)
  }
}
