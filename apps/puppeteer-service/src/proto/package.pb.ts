/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "PuppeteerService";

export interface HelloDto {
  name: string;
}

export interface HelloResponseDto {
  response: string;
}

export const PUPPETEER_SERVICE_PACKAGE_NAME = "PuppeteerService";

export interface HelloServiceClient {
  sayHello(request: HelloDto): Observable<HelloResponseDto>;
}

export interface HelloServiceController {
  sayHello(request: HelloDto): Promise<HelloResponseDto> | Observable<HelloResponseDto> | HelloResponseDto;
}

export function HelloServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["sayHello"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("HelloService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("HelloService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const HELLO_SERVICE_NAME = "HelloService";
