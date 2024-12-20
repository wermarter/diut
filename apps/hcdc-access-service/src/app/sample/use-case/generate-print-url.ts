import { AuthSubject, ExternalRoutePath, SampleAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { assertPermission } from 'src/app/auth/common'
import { AuthAuthorizeExternalRouteUseCase } from 'src/app/auth/use-case/authorize-external-route'
import { AUTH_CONTEXT_TOKEN, IAuthContext } from 'src/domain'
import { SamplePrintOptions } from '../common'
import { SampleAssertExistsUseCase } from './assert-exists'

@Injectable()
export class SampleGeneratePrintUrlUseCase {
  constructor(
    private readonly sampleAssertExistsUseCase: SampleAssertExistsUseCase,
    private readonly authorizeExternalRouteUseCase: AuthAuthorizeExternalRouteUseCase,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
  ) {}

  async execute(input: { printOptions: SamplePrintOptions[] }) {
    const { ability } = this.authContext.getDataInternal()
    const branchIds = new Set<string>()

    for (const printOptions of input.printOptions) {
      const entity = await this.sampleAssertExistsUseCase.execute({
        _id: printOptions.sampleId,
      })
      branchIds.add(entity.branchId)

      assertPermission(
        ability,
        AuthSubject.Sample,
        SampleAction.PrintResult,
        entity,
      )
    }

    const { path } = await this.authorizeExternalRouteUseCase.execute(
      this.constructor.name,
      ExternalRoutePath.PrintSampleResult,
      input,
      Array.from(branchIds),
    )

    return path
  }
}
