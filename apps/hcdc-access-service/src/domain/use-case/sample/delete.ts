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

@Injectable()
export class SampleDeleteUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(SampleRepositoryToken)
    private readonly sampleRepository: ISampleRepository,
    private readonly sampleAssertExistsUseCase: SampleAssertExistsUseCase,
  ) {}

  async execute(input: { id: string }) {
    const entity = await this.sampleAssertExistsUseCase.execute({
      _id: input.id,
    })
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Sample, SampleAction.Delete, entity)

    await this.sampleRepository.deleteById(input.id)

    return entity
  }
}
