import { ModuleRef } from '@nestjs/core'
import { Inject, Injectable } from '@nestjs/common'
import {
  AuthSubject,
  PrintFormAction,
  PrintTemplate,
  SampleAction,
} from '@diut/hcdc'
import {
  BrowserServiceClient,
  PageFormat,
  PageOrientation,
} from '@diut/services'
import { Observable, lastValueFrom } from 'rxjs'

import {
  AuthContextToken,
  BrowserServiceToken,
  EEntityNotFound,
  IAuthContext,
  assertPermission,
} from 'src/domain'
import {
  SamplePrintContext,
  SamplePrintOptions,
} from '../print-strategy/context'
import { SamplePrintFormChungStrategy } from '../print-strategy/form-chung'
import { ISamplePrintStrategy } from '../print-strategy/common'
import { SampleAssertExistsUseCase } from './assert-exists'
import { PrintFormAssertExistsUseCase } from 'src/app/print-form/use-case/assert-exists'

@Injectable()
export class SamplePrintUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(BrowserServiceToken)
    private readonly browserService: BrowserServiceClient,
    private readonly moduleRef: ModuleRef,
    private readonly sampleAssertExistsUseCase: SampleAssertExistsUseCase,
    private readonly printFormAssertExistsUseCase: PrintFormAssertExistsUseCase,
  ) {}

  async execute(input: SamplePrintOptions[]) {
    const { ability } = this.authContext.getData()
    const printContexts: SamplePrintContext[] = []

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
      assertPermission(
        ability,
        AuthSubject.PrintForm,
        PrintFormAction.Read,
        printForm,
      )
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

      switch (printForm.template) {
        case PrintTemplate.FormChung:
          strategy = await this.moduleRef.resolve(SamplePrintFormChungStrategy)
          break
        default:
          throw new EEntityNotFound(`PrintForm id=${printOptions.printFormId}`)
      }

      samplePrintContext.setStrategy(strategy)
      printContexts.push(samplePrintContext)
    }

    const response$ = this.browserService.printMultiplePage(
      new Observable((subscriber) => {
        ;(async function () {
          for (let i = 0; i < input.length; i++) {
            const printRequest = await printContexts[i].execute(input[i])
            subscriber.next({
              htmlContent: `<p>${JSON.stringify(printRequest)}</p>`,
              pageFormat: PageFormat.A4,
              pageOrientation: PageOrientation.Landscape,
            })
          }
        })().then(() => subscriber.complete())
      }),
    )

    const { mergedPdf } = await lastValueFrom(response$)

    console.log({ mergedPdf })

    return mergedPdf
  }
}
