import { Inject, Injectable } from '@nestjs/common'

import {
  AuthContextToken,
  BioProductRepositoryToken,
  IAuthContext,
  IBioProductRepository,
  SearchOptions,
  checkPermission,
} from 'src/domain/interface'
import { AuthSubject, BioProduct, BioProductAction } from 'src/domain/entity'
import { EAuthzPermissionDeny } from 'src/domain/exception'

@Injectable()
export class BioProductSearchUseCase {
  constructor(
    @Inject(BioProductRepositoryToken)
    private readonly bioProductRepository: IBioProductRepository,
    @Inject(AuthContextToken) private readonly authContext: IAuthContext,
  ) {}

  execute(input: SearchOptions<BioProduct>) {
    const { ability } = this.authContext.getData()

    if (
      !checkPermission(ability, AuthSubject.BioProduct, BioProductAction.Read)
    ) {
      throw new EAuthzPermissionDeny()
    }

    return this.bioProductRepository.search(input)
  }
}
