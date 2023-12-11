import { Observable } from 'rxjs'

export const PuppeteerServiceToken = Symbol('PuppeteerService')

export interface HelloDto {
  name: string
}

export interface HelloResponseDto {
  response: string
}

export interface IPuppeteerService {
  sayHello(request: HelloDto): Observable<HelloResponseDto>
}
