import { Inject, Injectable } from '@nestjs/common'
import { SampleAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  SAMPLE_REPO_TOKEN,
  IAuthContext,
  ISampleRepository,
  assertPermission,
} from 'src/domain'
import { SampleAssertExistsUseCase } from './assert-exists'
import { SampleValidateUseCase } from './validate'

@Injectable()
export class SampleUpdateUseCase {
  constructor(
    @Inject(SAMPLE_REPO_TOKEN)
    private readonly sampleRepository: ISampleRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly sampleAssertExistsUseCase: SampleAssertExistsUseCase,
    private readonly sampleValidateUseCase: SampleValidateUseCase,
  ) {}

  async execute(...input: Parameters<ISampleRepository['update']>) {
    const entity = await this.sampleAssertExistsUseCase.execute(input[0])
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Sample, SampleAction.Update, entity)
    await this.sampleValidateUseCase.execute(input[1])

    return this.sampleRepository.update(...input)
  }
}
