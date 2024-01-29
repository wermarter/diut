import { Inject, Injectable } from '@nestjs/common'
import { FilterQuery } from 'mongoose'
import { accessibleBy } from '@casl/mongoose'

import { Sample, SampleAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import {
  AuthContextToken,
  SampleRepositoryToken,
  IAuthContext,
  ISampleRepository,
} from 'src/domain/interface'

@Injectable()
export class SampleDeleteManyUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(SampleRepositoryToken)
    private readonly sampleRepository: ISampleRepository,
  ) {}

  async execute(input: FilterQuery<Sample>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Sample, SampleAction.Delete, input)

    await this.sampleRepository.deleteMany({
      $and: [input, accessibleBy(ability, SampleAction.Delete).Sample],
    })
  }
}
