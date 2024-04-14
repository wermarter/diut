import { Inject, Injectable } from '@nestjs/common'
import { Sample, SampleAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  SampleRepositoryToken,
  EntityFindOneOptions,
  IAuthContext,
  ISampleRepository,
  assertPermission,
} from 'src/domain'
import { SampleAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class SampleFindOneUseCase {
  constructor(
    @Inject(SampleRepositoryToken)
    private readonly sampleRepository: ISampleRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly sampleAuthorizePopulatesUseCase: SampleAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntityFindOneOptions<Sample>) {
    input.populates = this.sampleAuthorizePopulatesUseCase.execute(
      input.populates,
    )
    const entity = await this.sampleRepository.findOne(input)
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Sample, SampleAction.Read, entity)

    return entity
  }
}
