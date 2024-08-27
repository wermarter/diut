import { Inject, Injectable } from '@nestjs/common'
import { SampleType, SampleTypeAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  SAMPLETYPE_REPO_TOKEN,
  EntityFindOneOptions,
  IAuthContext,
  ISampleTypeRepository,
} from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
import { SampleTypeAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class SampleTypeFindOneUseCase {
  constructor(
    @Inject(SAMPLETYPE_REPO_TOKEN)
    private readonly sampleTypeRepository: ISampleTypeRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly sampleTypeAuthorizePopulatesUseCase: SampleTypeAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntityFindOneOptions<SampleType>) {
    input.populates = this.sampleTypeAuthorizePopulatesUseCase.execute(
      input.populates,
    )
    const entity = await this.sampleTypeRepository.findOne(input)
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.SampleType,
      SampleTypeAction.Read,
      entity,
    )

    return entity
  }
}
