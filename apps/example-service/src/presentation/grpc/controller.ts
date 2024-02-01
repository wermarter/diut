import {
  ExampleServiceControllerMethods,
  ExampleServiceHelloDto,
  ExampleServiceHelloResponseDto,
} from '@diut/services'

import { ExampleService } from 'src/app'

@ExampleServiceControllerMethods()
export class ExampleServiceController {
  constructor(private readonly exampleService: ExampleService) {}

  sayHello({
    myNameIs,
  }: ExampleServiceHelloDto): ExampleServiceHelloResponseDto {
    return { response: this.exampleService.sayHello(myNameIs) }
  }
}
