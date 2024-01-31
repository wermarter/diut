/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "DiutExampleService";

export interface HelloDto {
  name: string;
}

export interface HelloResponseDto {
  response: string;
}

export const DIUT_EXAMPLE_SERVICE_PACKAGE_NAME = "DiutExampleService";

export interface ExampleServiceClient {
  sayHello(request: HelloDto): Observable<HelloResponseDto>;
}

export interface ExampleServiceController {
  sayHello(request: HelloDto): Promise<HelloResponseDto> | Observable<HelloResponseDto> | HelloResponseDto;
}

export function ExampleServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["sayHello"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ExampleService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ExampleService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const EXAMPLE_SERVICE_NAME = "ExampleService";
