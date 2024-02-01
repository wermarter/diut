/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export interface PdfServiceHelloDto {
  name: string;
}

export interface PdfServiceHelloResponseDto {
  response: string;
}

export interface PDFServiceClient {
  sayHello(request: PdfServiceHelloDto): Observable<PdfServiceHelloResponseDto>;
}

export interface PDFServiceController {
  sayHello(
    request: PdfServiceHelloDto,
  ): Promise<PdfServiceHelloResponseDto> | Observable<PdfServiceHelloResponseDto> | PdfServiceHelloResponseDto;
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
