import { Module } from '@nestjs/common'

import { ExampleService } from './service'
import { ExampleController } from './controller'

@Module({
  providers: [ExampleService],
  controllers: [ExampleController],
})
export class ExampleModule {}
