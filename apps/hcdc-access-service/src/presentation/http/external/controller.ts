import { Controller, Get } from '@nestjs/common'

@Controller('external')
export class ExternalController {
  constructor() {}

  @Get('get')
  test() {
    return {
      message: 'Hello World!',
    }
  }
}
