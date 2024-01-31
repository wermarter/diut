/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "DiutExcelService";

export interface HelloDto {
  name: string;
}

export interface HelloResponseDto {
  response: string;
}

export const DIUT_EXCEL_SERVICE_PACKAGE_NAME = "DiutExcelService";

export interface ExcelServiceClient {
  sayHello(request: HelloDto): Observable<HelloResponseDto>;
}

export interface ExcelServiceController {
  sayHello(request: HelloDto): Promise<HelloResponseDto> | Observable<HelloResponseDto> | HelloResponseDto;
}

export function ExcelServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["sayHello"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ExcelService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ExcelService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const EXCEL_SERVICE_NAME = "ExcelService";
