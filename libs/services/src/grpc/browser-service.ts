/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export interface BrowserServiceHelloDto {
  name: string;
}

export interface BrowserServiceHelloResponseDto {
  response: string;
}

export interface BrowserServiceClient {
  sayHello(request: BrowserServiceHelloDto): Observable<BrowserServiceHelloResponseDto>;
}

export interface BrowserServiceController {
  sayHello(
    request: BrowserServiceHelloDto,
  ):
    | Promise<BrowserServiceHelloResponseDto>
    | Observable<BrowserServiceHelloResponseDto>
    | BrowserServiceHelloResponseDto;
}

export function BrowserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["sayHello"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("BrowserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("BrowserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const BROWSER_SERVICE_NAME = "BrowserService";
