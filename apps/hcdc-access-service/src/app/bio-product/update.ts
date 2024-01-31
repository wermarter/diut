import { Inject, Injectable } from '@nestjs/common'

import { BioProductAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import {
  AuthContextToken,
  BioProductRepositoryToken,
  IAuthContext,
  IBioProductRepository,
} from 'src/domain/interface'
import { BioProductAssertExistsUseCase } from './assert-exists'
import { BioProductValidateUseCase } from './validate'

@Injectable()
export class BioProductUpdateUseCase {
  constructor(
    @Inject(BioProductRepositoryToken)
    private readonly bioProductRepository: IBioProductRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly bioProductAssertExistsUseCase: BioProductAssertExistsUseCase,
    private readonly bioProductValidateUseCase: BioProductValidateUseCase,
  ) {}

  async execute(...input: Parameters<IBioProductRepository['update']>) {
    const entity = await this.bioProductAssertExistsUseCase.execute(input[0])
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.BioProduct,
      BioProductAction.Update,
      entity,
    )
    await this.bioProductValidateUseCase.execute(input[1])

    return this.bioProductRepository.update(...input)
  }
}
