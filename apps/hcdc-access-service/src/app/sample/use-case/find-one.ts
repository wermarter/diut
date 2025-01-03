import { AuthSubject, Sample, SampleAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  EntityFindOneOptions,
  IAuthContext,
  ISampleRepository,
  SAMPLE_REPO_TOKEN,
} from 'src/domain'
import { SampleAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class SampleFindOneUseCase {
  constructor(
    @Inject(SAMPLE_REPO_TOKEN)
    private readonly sampleRepository: ISampleRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
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
