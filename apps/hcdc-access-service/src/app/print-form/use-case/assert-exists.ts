import { PrintForm } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import {
  EEntityNotFound,
  EntityFindOneOptions,
  IPrintFormRepository,
  PRINTFORM_REPO_TOKEN,
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
