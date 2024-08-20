import { Inject, Injectable } from '@nestjs/common'
import {
  AuthSubject,
  BioProductAction,
  InstrumentAction,
  SampleTypeAction,
  TestCategoryAction,
  PrintFormAction,
  Test,
  BranchAction,
} from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  EEntityTestInvalidBioProduct,
  IAuthContext,
  assertPermission,
} from 'src/domain'
import { BranchAssertExistsUseCase } from '../../branch/use-case/assert-exists'
import { BioProductAssertExistsUseCase } from '../../bio-product/use-case/assert-exists'
import { InstrumentAssertExistsUseCase } from '../../instrument/use-case/assert-exists'
import { SampleTypeAssertExistsUseCase } from '../../sample-type/use-case/assert-exists'
import { TestCategoryAssertExistsUseCase } from '../../test-category/use-case/assert-exists'
import { PrintFormAssertExistsUseCase } from '../../print-form/use-case/assert-exists'

@Injectable()
export class TestValidateUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly bioProductAssertExistsUseCase: BioProductAssertExistsUseCase,
    private readonly instrumentAssertExistsUseCase: InstrumentAssertExistsUseCase,
    private readonly sampleTypeAssertExistsUseCase: SampleTypeAssertExistsUseCase,
    private readonly testCategoryAssertExistsUseCase: TestCategoryAssertExistsUseCase,
    private readonly printFormAssertExistsUseCase: PrintFormAssertExistsUseCase,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
  ) {}

  async execute(input: Partial<Test>) {
    const { ability } = this.authContext.getData()
    const {
      bioProductId,
      instrumentId,
      sampleTypeId,
      testCategoryId,
      printFormIds,
      branchId,
    } = input

    if (bioProductId != undefined) {
      const bioProduct = await this.bioProductAssertExistsUseCase.execute({
        _id: bioProductId,
      })
      assertPermission(
        ability,
        AuthSubject.BioProduct,
        BioProductAction.Read,
        bioProduct,
      )
      if (input._id && bioProduct.testId.toString() !== input._id.toString()) {
        throw new EEntityTestInvalidBioProduct(
          `${bioProduct.testId} !== ${input._id}`,
        )
      }
    }

    if (instrumentId != undefined) {
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

    if (sampleTypeId != undefined) {
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

    if (printFormIds?.length) {
      for (const printFormId of printFormIds) {
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
    }

    if (branchId !== undefined) {
      const branch = await this.branchAssertExistsUseCase.execute({
        _id: branchId,
      })
      assertPermission(ability, AuthSubject.Branch, BranchAction.Read, branch)
    }
  }
}
