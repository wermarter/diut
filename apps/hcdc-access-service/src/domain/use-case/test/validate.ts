import { Inject, Injectable } from '@nestjs/common'

import {
  Test,
  BranchAction,
  EntityData,
  BioProductAction,
  InstrumentAction,
  SampleTypeAction,
  TestCategoryAction,
  PrintFormAction,
} from 'src/domain/entity'
import { BranchAssertExistsUseCase } from '../branch/assert-exists'
import { AuthContextToken, IAuthContext } from 'src/domain/interface'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import { BioProductAssertExistsUseCase } from '../bio-product/assert-exists'
import { InstrumentAssertExistsUseCase } from '../instrument/assert-exists'
import { SampleTypeAssertExistsUseCase } from '../sample-type/assert-exists'
import { TestCategoryAssertExistsUseCase } from '../test-category/assert-exists'
import { PrintFormAssertExistsUseCase } from '../print-form/assert-exists'

@Injectable()
export class TestValidateUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly bioProductAssertExistsUseCase: BioProductAssertExistsUseCase,
    private readonly instrumentAssertExistsUseCase: InstrumentAssertExistsUseCase,
    private readonly sampleTypeAssertExistsUseCase: SampleTypeAssertExistsUseCase,
    private readonly testCategoryAssertExistsUseCase: TestCategoryAssertExistsUseCase,
    private readonly printFormAssertExistsUseCase: PrintFormAssertExistsUseCase,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
  ) {}

  async execute(input: Partial<EntityData<Test>>) {
    const { ability } = this.authContext.getData()
    const {
      bioProductId,
      instrumentId,
      sampleTypeId,
      testCategoryId,
      printFormId,
      branchId,
    } = input

    if (bioProductId !== undefined) {
      const bioProduct = await this.bioProductAssertExistsUseCase.execute({
        _id: bioProductId,
      })
      assertPermission(
        ability,
        AuthSubject.BioProduct,
        BioProductAction.Read,
        bioProduct,
      )
    }

    if (instrumentId !== undefined) {
      const instrument = await this.instrumentAssertExistsUseCase.execute({
        _id: instrumentId,
      })
      assertPermission(
        ability,
        AuthSubject.Instrument,
        InstrumentAction.Read,
        instrument,
      )
    }

    if (sampleTypeId !== undefined) {
      const sampleType = await this.sampleTypeAssertExistsUseCase.execute({
        _id: sampleTypeId,
      })
      assertPermission(
        ability,
        AuthSubject.SampleType,
        SampleTypeAction.Read,
        sampleType,
      )
    }

    if (testCategoryId !== undefined) {
      const testCategory = await this.testCategoryAssertExistsUseCase.execute({
        _id: testCategoryId,
      })
      assertPermission(
        ability,
        AuthSubject.TestCategory,
        TestCategoryAction.Read,
        testCategory,
      )
    }

    if (printFormId !== undefined) {
      const printForm = await this.printFormAssertExistsUseCase.execute({
        _id: printFormId,
      })
      assertPermission(
        ability,
        AuthSubject.PrintForm,
        PrintFormAction.Read,
        printForm,
      )
    }

    if (branchId !== undefined) {
      const branch = await this.branchAssertExistsUseCase.execute({
        _id: branchId,
      })
      assertPermission(
        ability,
        AuthSubject.Branch,
        BranchAction.AssignToSubject,
        branch,
      )
    }
  }
}
