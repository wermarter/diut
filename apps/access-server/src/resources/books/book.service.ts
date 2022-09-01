import { Logger, OnModuleInit } from '@nestjs/common'

export class BookService implements OnModuleInit {
  private readonly logger = new Logger(BookService.name)

  onModuleInit() {
    this.logger.debug({ intent: 'this is the content' }, 'how about some text')
  }
}
