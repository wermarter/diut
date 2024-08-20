import { Inject, Injectable } from '@nestjs/common'
import { Role } from '@diut/hcdc'

import {
  ROLE_REPO_TOKEN,
  EntityFindOneOptions,
  IRoleRepository,
  EEntityNotFound,
} from 'src/domain'

@Injectable()
export class RoleAssertExistsUseCase {
  constructor(
    @Inject(ROLE_REPO_TOKEN)
    private readonly roleRepository: IRoleRepository,
  ) {}

  async execute(input: EntityFindOneOptions<Role>['filter']) {
    const rv = await this.roleRepository.findOne({ filter: input })

    if (rv === null) {
      throw new EEntityNotFound(`Role ${JSON.stringify(input)}`)
    }

    return rv
  }
}
