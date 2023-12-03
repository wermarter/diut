/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices'
import { Observable } from 'rxjs'

export const protobufPackage = 'diut'

export interface HelloDto {
  name: string
}

export interface HelloResponseDto {
  response: string
}

export interface PuppeteerServiceClient {
  sayHello(request: HelloDto): Observable<HelloResponseDto>
}

export interface PuppeteerServiceController {
  sayHello(
    request: HelloDto,
  ): Promise<HelloResponseDto> | Observable<HelloResponseDto> | HelloResponseDto
}

export function PuppeteerServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['sayHello']
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      )
      GrpcMethod('PuppeteerService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      )
    }
    const grpcStreamMethods: string[] = []
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      )
      GrpcStreamMethod('PuppeteerService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      )
    }
  }
}

export const PUPPETEER_SERVICE_NAME = 'PuppeteerService'
