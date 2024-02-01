import { Inject, Injectable } from '@nestjs/common'

import { SampleAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import {
  AuthContextToken,
  SampleRepositoryToken,
  IAuthContext,
  ISampleRepository,
} from 'src/domain/interface'
import { SampleAssertExistsUseCase } from './assert-exists'
import { SampleValidateUseCase } from './validate'

@Injectable()
export class SampleUpdateUseCase {
  constructor(
    @Inject(SampleRepositoryToken)
    private readonly sampleRepository: ISampleRepository,
    @Inject(AuthContextToken)
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
