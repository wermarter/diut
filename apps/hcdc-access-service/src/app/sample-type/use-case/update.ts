import { Inject, Injectable } from '@nestjs/common'
import { SampleTypeAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  SampleTypeRepositoryToken,
  IAuthContext,
  ISampleTypeRepository,
  assertPermission,
} from 'src/domain'
import { SampleTypeAssertExistsUseCase } from './assert-exists'
import { SampleTypeValidateUseCase } from './validate'

@Injectable()
export class SampleTypeUpdateUseCase {
  constructor(
    @Inject(SampleTypeRepositoryToken)
    private readonly sampleTypeRepository: ISampleTypeRepository,
    @Inject(AuthContextToken)
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
