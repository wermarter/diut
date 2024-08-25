import { Inject, Injectable } from '@nestjs/common'
import {
  AuthSubject,
  BioProductAction,
  BranchAction,
  InstrumentAction,
  PrintFormAction,
  SampleTypeAction,
  Test,
  TestCategoryAction,
} from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  EntityFindOneOptions,
  IAuthContext,
  EEntityPopulatePathUnknown,
} from 'src/domain'
import { authorizePopulates } from 'src/app/auth/common'

@Injectable()
export class TestAuthorizePopulatesUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
  ) {}

  execute(input: EntityFindOneOptions<Test>['populates']) {
    const { ability } = this.authContext.getData()

    return authorizePopulates(ability, input, (path) => {
      switch (path) {
        case 'bioProduct':
          return {
            subject: AuthSubject.BioProduct,
            action: BioProductAction.Read,
          }
        case 'instrument':
          return {
            subject: AuthSubject.Instrument,
            action: InstrumentAction.Read,
          }
        case 'sampleType':
          return {
            subject: AuthSubject.SampleType,
            action: SampleTypeAction.Read,
          }
        case 'testCategory':
          return {
            subject: AuthSubject.TestCategory,
            action: TestCategoryAction.Read,
          }
        case 'printForms':
          return {
            subject: AuthSubject.PrintForm,
            action: PrintFormAction.Read,
          }
        case 'branch':
          return { subject: AuthSubject.Branch, action: BranchAction.Read }
        default:
          throw new EEntityPopulatePathUnknown(path)
      }
    })
  }
}
