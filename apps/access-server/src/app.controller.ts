import { InjectLogger, WinstonLogger } from './core'
import { Controller, Get, Post } from '@nestjs/common'
// import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(
    // private readonly appService: AppService,
    @InjectLogger() private readonly logger: WinstonLogger
  ) {}

  @Get()
  getHello(): void {
    this.logger.info('I am simple logg')
  }

  @Post()
  postError(): void {
    throw Error('Heleplepelpl')
  }
}
