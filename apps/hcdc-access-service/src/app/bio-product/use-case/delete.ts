import { Inject, Injectable } from '@nestjs/common'
import { BioProductAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  BioProductRepositoryToken,
  EEntityCannotDelete,
  IAuthContext,
  IBioProductRepository,
  ITestRepository,
  TestRepositoryToken,
  assertPermission,
} from 'src/domain'
import { BioProductAssertExistsUseCase } from './assert-exists'

@Injectable()
export class BioProductDeleteUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(BioProductRepositoryToken)
    private readonly bioProductRepository: IBioProductRepository,
    @Inject(TestRepositoryToken)
    private readonly testRepository: ITestRepository,
    private readonly bioProductAssertExistsUseCase: BioProductAssertExistsUseCase,
  ) {}

  async execute(input: { id: string }) {
    const entity = await this.bioProductAssertExistsUseCase.execute({
      _id: input.id,
    })
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.BioProduct,
      BioProductAction.Delete,
      entity,
    )

    const connectedTestCount = await this.testRepository.count({
      bioProductId: input.id,
    })
    if (connectedTestCount > 0) {
      throw new EEntityCannotDelete(`${connectedTestCount} connected Test`)
    }

    await this.bioProductRepository.deleteById(input.id)

    return entity
  }
}
