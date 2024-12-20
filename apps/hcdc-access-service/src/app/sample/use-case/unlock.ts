import { AuthSubject, SampleAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  IAuthContext,
  ISampleRepository,
  SAMPLE_REPO_TOKEN,
} from 'src/domain'
import { SampleAssertExistsUseCase } from './assert-exists'

@Injectable()
export class SampleUnlockUseCase {
  constructor(
    @Inject(SAMPLE_REPO_TOKEN)
    private readonly sampleRepository: ISampleRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly sampleAssertExistsUseCase: SampleAssertExistsUseCase,
  ) {}

  async execute(input: Parameters<ISampleRepository['update']>[0]) {
    const entity = await this.sampleAssertExistsUseCase.execute(input)
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Sample, SampleAction.Lock, entity)

    await this.sampleRepository.update(input, { isLocked: false })
  }
}
