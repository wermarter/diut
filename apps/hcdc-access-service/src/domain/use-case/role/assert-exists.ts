import { Inject, Injectable } from '@nestjs/common'

import { Role } from 'src/domain/entity'
import { EEntityNotFound } from 'src/domain/exception'
import {
  RoleRepositoryToken,
  EntityFindOneOptions,
  IRoleRepository,
} from 'src/domain/interface'

@Injectable()
export class RoleAssertExistsUseCase {
  constructor(
    @Inject(RoleRepositoryToken)
    private readonly roleRepository: IRoleRepository,
  ) {}

  async execute(input: EntityFindOneOptions<Role>['filter']) {
    const rv = await this.roleRepository.findOne({ filter: input })

    if (rv == null) {
      throw new EEntityNotFound(`Role ${JSON.stringify(input)}`)
    }

    return rv
  }
}
