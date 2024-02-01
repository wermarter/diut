import { Observable } from 'rxjs'

export const ExampleServiceToken = Symbol('ExampleService')

export interface ExampleServiceHelloDto {
  myNameIs: string
}

export interface ExampleServiceHelloResponseDto {
  response: string
}

export interface IExampleService {
  sayHello(
    request: ExampleServiceHelloDto,
  ): Observable<ExampleServiceHelloResponseDto>
}
