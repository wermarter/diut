/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "DiutBrowserService";

export interface HelloDto {
  name: string;
}

export interface HelloResponseDto {
  response: string;
}

export const DIUT_BROWSER_SERVICE_PACKAGE_NAME = "DiutBrowserService";

export interface BrowserServiceClient {
  sayHello(request: HelloDto): Observable<HelloResponseDto>;
}

export interface BrowserServiceController {
  sayHello(request: HelloDto): Promise<HelloResponseDto> | Observable<HelloResponseDto> | HelloResponseDto;
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
