/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "diut";

export interface HelloDto {
  name: string;
}

export interface HelloResponseDto {
  response: string;
}

export const DIUT_PACKAGE_NAME = "diut";

export interface PDFServiceClient {
  sayHello(request: HelloDto): Observable<HelloResponseDto>;
}

export interface PDFServiceController {
  sayHello(request: HelloDto): Promise<HelloResponseDto> | Observable<HelloResponseDto> | HelloResponseDto;
}

export function PDFServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["sayHello"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("PDFService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("PDFService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const P_DF_SERVICE_NAME = "PDFService";
