import { Role } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import {
  EEntityNotFound,
  EntityFindOneOptions,
  IRoleRepository,
  ROLE_REPO_TOKEN,
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
