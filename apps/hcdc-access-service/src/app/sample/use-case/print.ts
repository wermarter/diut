import { ModuleRef } from '@nestjs/core'
import { Inject, Injectable } from '@nestjs/common'

import {
  AuthContextToken,
  AuthSubject,
  IAuthContext,
  PrintFormAction,
  PrintTemplate,
  SampleAction,
  assertPermission,
} from 'src/domain'
import {
  SamplePrintContext,
  SamplePrintOptions,
} from '../print-strategy/context'
import { SamplePrintFormChungStrategy } from '../print-strategy/form-chung'
import { ISamplePrintStrategy } from '../print-strategy/common'
import { SampleAssertExistsUseCase } from './assert-exists'
import { PrintFormAssertExistsUseCase } from 'src/app/print-form'

@Injectable()
export class SamplePrintUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly moduleRef: ModuleRef,
    private readonly sampleAssertExistsUseCase: SampleAssertExistsUseCase,
    private readonly printFormAssertExistsUseCase: PrintFormAssertExistsUseCase,
  ) {}

  async execute(input: SamplePrintOptions[]) {
    const { ability } = this.authContext.getData()
    const printContextes: SamplePrintContext[] = []

    for (const printOptions of input) {
      const sample = await this.sampleAssertExistsUseCase.execute({
        _id: printOptions.sampleId,
      })
      assertPermission(ability, AuthSubject.Sample, SampleAction.Read, sample)
      assertPermission(
        ability,
        AuthSubject.Sample,
        SampleAction.PrintResult,
        sample,
      )

      const printForm = await this.printFormAssertExistsUseCase.execute({
        _id: printOptions.printFormId,
      })
      // TODO: check read permission
      if (printOptions.overrideAuthor) {
        assertPermission(
          ability,
          AuthSubject.PrintForm,
          PrintFormAction.OverrideAuthor,
          printForm,
        )
      }

      const samplePrintContext =
        await this.moduleRef.resolve(SamplePrintContext)
      let strategy: ISamplePrintStrategy

      switch (printOptions.printFormId) {
        case PrintTemplate.FormChung:
          strategy = await this.moduleRef.resolve(SamplePrintFormChungStrategy)
          break
        default:
          throw new Error()
      }

      samplePrintContext.setStrategy(strategy)
      printContextes.push(samplePrintContext)
    }

    // combine pdf here
    return Promise.all(
      printContextes.map((printContext, index) =>
        printContext.execute(input[index]),
      ),
    )
  }
}
