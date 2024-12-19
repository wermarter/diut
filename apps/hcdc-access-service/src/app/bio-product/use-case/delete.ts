import { AuthSubject, BioProductAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  BIOPRODUCT_REPO_TOKEN,
  EEntityCannotDelete,
  IAuthContext,
  IBioProductRepository,
  ITestRepository,
  TEST_REPO_TOKEN,
} from 'src/domain'
import { BioProductAssertExistsUseCase } from './assert-exists'

@Injectable()
export class BioProductDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(BIOPRODUCT_REPO_TOKEN)
    private readonly bioProductRepository: IBioProductRepository,
    @Inject(TEST_REPO_TOKEN)
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
