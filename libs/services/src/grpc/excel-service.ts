/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export interface ExcelServiceHelloDto {
  name: string;
}

export interface ExcelServiceHelloResponseDto {
  response: string;
}

export interface ExcelServiceClient {
  sayHello(request: ExcelServiceHelloDto): Observable<ExcelServiceHelloResponseDto>;
}

export interface ExcelServiceController {
  sayHello(
    request: ExcelServiceHelloDto,
  ): Promise<ExcelServiceHelloResponseDto> | Observable<ExcelServiceHelloResponseDto> | ExcelServiceHelloResponseDto;
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
