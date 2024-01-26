import { Inject, Injectable } from '@nestjs/common'

import { AuthSubject, authorizePopulates } from 'src/domain/auth'
import {
  BioProductAction,
  BranchAction,
  InstrumentAction,
  PrintFormAction,
  SampleTypeAction,
  Test,
  TestCategoryAction,
} from 'src/domain/entity'
import { EEntityPopulatePathUnknown } from 'src/domain/exception'
import {
  AuthContextToken,
  EntityFindOneOptions,
  IAuthContext,
} from 'src/domain/interface'

@Injectable()
export class TestAuthorizePopulatesUseCase {
  constructor(
    @Inject(AuthContextToken)
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
        case 'printForm':
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
