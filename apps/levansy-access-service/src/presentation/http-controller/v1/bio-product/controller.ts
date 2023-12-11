import { AppController } from '@diut/nest-core'

import { BioProductHelloUseCase } from 'src/domain'
import { bioProductRoutes } from './routes'
import { AppRoute } from 'src/common/route.decorator'

@AppController(bioProductRoutes.controller)
export class BioProductController {
  constructor(
    private readonly bioProductHelloUseCase: BioProductHelloUseCase,
  ) {}

  @AppRoute(bioProductRoutes.hello)
  hello() {
    return this.bioProductHelloUseCase.handle()
  }
}
