import { Inject, Injectable } from '@nestjs/common'
import { PrintForm } from '@diut/hcdc'

import {
  PRINTFORM_REPO_TOKEN,
  EntityFindOneOptions,
  IPrintFormRepository,
  EEntityNotFound,
} from 'src/domain'

@Injectable()
export class PrintFormAssertExistsUseCase {
  constructor(
    @Inject(PRINTFORM_REPO_TOKEN)
    private readonly printFormRepository: IPrintFormRepository,
  ) {}

  async execute(input: EntityFindOneOptions<PrintForm>['filter']) {
    const rv = await this.printFormRepository.findOne({ filter: input })

    if (rv === null) {
      throw new EEntityNotFound(`PrintForm ${JSON.stringify(input)}`)
    }

    return rv
  }
}
