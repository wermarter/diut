import { Inject, Injectable } from '@nestjs/common'

import { SampleType, SampleTypeAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import {
  AuthContextToken,
  SampleTypeRepositoryToken,
  EntityFindOneOptions,
  IAuthContext,
  ISampleTypeRepository,
} from 'src/domain/interface'
import { SampleTypeAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class SampleTypeFindOneUseCase {
  constructor(
    @Inject(SampleTypeRepositoryToken)
    private readonly sampleTypeRepository: ISampleTypeRepository,
    @Inject(AuthContextToken)
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
