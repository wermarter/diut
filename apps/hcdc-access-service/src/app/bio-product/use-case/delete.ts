import { AuthSubject, BioProduct, BioProductAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { FilterQuery } from 'mongoose'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  BIOPRODUCT_REPO_TOKEN,
  IAuthContext,
  IBioProductRepository,
  ITestRepository,
  TEST_REPO_TOKEN,
} from 'src/domain'
import { BioProductSearchUseCase } from './search'

@Injectable()
export class BioProductDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(BIOPRODUCT_REPO_TOKEN)
    private readonly bioProductRepository: IBioProductRepository,
    @Inject(TEST_REPO_TOKEN)
    private readonly testRepository: ITestRepository,
    private readonly bioProductSearchUseCase: BioProductSearchUseCase,
  ) {}

  async execute(input: FilterQuery<BioProduct>) {
    const { ability } = this.authContext.getData()
    const { items: bioProducts } = await this.bioProductSearchUseCase.execute({
      filter: input,
    })

    for (const bioProduct of bioProducts) {
      assertPermission(
        ability,
        AuthSubject.BioProduct,
        BioProductAction.Delete,
        bioProduct,
      )

      await this.testRepository.updateMany(
        { bioProductId: bioProduct._id },
        { bioProductId: null },
      )

      await this.bioProductRepository.deleteById(bioProduct._id)
    }
  }
}
