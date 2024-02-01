/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export interface ExampleServiceHelloDto {
  myNameIs: string;
}

export interface ExampleServiceHelloResponseDto {
  response: string;
}

export interface ExampleServiceClient {
  sayHello(request: ExampleServiceHelloDto): Observable<ExampleServiceHelloResponseDto>;
}

export interface ExampleServiceController {
  sayHello(
    request: ExampleServiceHelloDto,
  ):
    | Promise<ExampleServiceHelloResponseDto>
    | Observable<ExampleServiceHelloResponseDto>
    | ExampleServiceHelloResponseDto;
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
