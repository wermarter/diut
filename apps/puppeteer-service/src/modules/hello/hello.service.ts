import { Injectable } from '@nestjs/common'

@Injectable()
export class HelloService {
  sayHello(name: string) {
    return `Hello, ${name}!`
  }
}
