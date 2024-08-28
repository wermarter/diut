import { AuthSubject, SampleType, SampleTypeAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  EntityFindOneOptions,
  IAuthContext,
  ISampleTypeRepository,
  SAMPLETYPE_REPO_TOKEN,
} from 'src/domain'
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
