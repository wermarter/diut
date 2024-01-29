import { Inject, Injectable } from '@nestjs/common'
import { FilterQuery, UpdateQuery } from 'mongoose'

import { Sample, SampleAction, SampleInfo } from 'src/domain/entity'
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
export class SampleUpdateInfoUseCase {
  constructor(
    @Inject(SampleRepositoryToken)
    private readonly sampleRepository: ISampleRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly sampleAssertExistsUseCase: SampleAssertExistsUseCase,
    private readonly sampleValidateUseCase: SampleValidateUseCase,
  ) {}

  async execute(input: {
    filter: FilterQuery<Sample>
    data: UpdateQuery<SampleInfo>
  }) {
    const entity = await this.sampleAssertExistsUseCase.execute(input.filter)
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.Sample,
      SampleAction.UpdateInfo,
      entity,
    )

    if (input.data.testIds?.length) {
      input.data.results = input.data.testIds
    }

    await this.sampleValidateUseCase.execute(input.data)

    return this.sampleRepository.update(input.filter, input.data)
  }
}
