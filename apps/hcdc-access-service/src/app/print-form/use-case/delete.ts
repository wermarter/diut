import { AuthSubject, PrintForm, PrintFormAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { FilterQuery } from 'mongoose'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  EEntityCannotDelete,
  IAuthContext,
  IPrintFormRepository,
  ITestRepository,
  PRINTFORM_REPO_TOKEN,
  TEST_REPO_TOKEN,
} from 'src/domain'
import { PrintFormSearchUseCase } from './search'

@Injectable()
export class PrintFormDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(PRINTFORM_REPO_TOKEN)
    private readonly printFormRepository: IPrintFormRepository,
    @Inject(TEST_REPO_TOKEN)
    private readonly testRepository: ITestRepository,
    private readonly printFormSearchUseCase: PrintFormSearchUseCase,
  ) {}

  async execute(input: FilterQuery<PrintForm>) {
    const { ability } = this.authContext.getData()
    const { items: printForms } = await this.printFormSearchUseCase.execute({
      filter: input,
    })

    for (const printForm of printForms) {
      assertPermission(
        ability,
        AuthSubject.PrintForm,
        PrintFormAction.Delete,
        printForm,
      )

      const connectedTestCount = await this.testRepository.count({
        printFormIds: { $elemMatch: { $eq: printForm._id } },
      })
      if (connectedTestCount > 0) {
        throw new EEntityCannotDelete(`${connectedTestCount} connected Test`)
      }

      await this.printFormRepository.deleteById(printForm._id)
    }
  }
}
