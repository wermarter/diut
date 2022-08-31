import { Controller, Get, Logger, Post } from '@nestjs/common'

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name)

  constructor() {}

  @Get()
  getHello(): void {
    this.logger.log('I am simple logg')
  }

  @Post()
  postError(): void {
    throw Error('Heleplepelpl')
  }
}
