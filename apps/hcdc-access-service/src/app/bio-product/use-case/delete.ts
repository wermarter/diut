import { Inject, Injectable } from '@nestjs/common'
import { BioProductAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  BioProductRepositoryToken,
  IAuthContext,
  IBioProductRepository,
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

    await this.bioProductRepository.deleteById(input.id)

    return entity
  }
}