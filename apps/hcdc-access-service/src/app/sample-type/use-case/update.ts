import { AuthSubject, SampleTypeAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  IAuthContext,
  ISampleTypeRepository,
  SAMPLETYPE_REPO_TOKEN,
} from 'src/domain'
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
