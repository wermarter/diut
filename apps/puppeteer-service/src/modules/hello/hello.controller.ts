import { GrpcMethod } from '@nestjs/microservices'
import { Controller } from '@nestjs/common'

import {
  HelloDto,
  HelloResponseDto,
  HelloServiceController,
  HelloServiceControllerMethods,
} from 'src/proto/package.pb'
import { HelloService } from './hello.service'

@Controller()
@HelloServiceControllerMethods()
export class HelloController implements HelloServiceController {
  constructor(private readonly helloService: HelloService) {}

  @GrpcMethod('HelloService', 'sayHello')
  sayHello({ name }: HelloDto): HelloResponseDto {
    return { response: this.helloService.sayHello(name) }
  }
}
