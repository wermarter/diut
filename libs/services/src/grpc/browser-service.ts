/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

/** Enum for paper formats supported by Puppeteer. */
export enum PageFormat {
  /** LETTER - 8.5in x 11in */
  LETTER = 0,
  /** LEGAL - 8.5in x 14in */
  LEGAL = 1,
  /** TABLOID - 11in x 17in */
  TABLOID = 2,
  /** LEDGER - 17in x 11in */
  LEDGER = 3,
  /** A0 - 33.1in x 46.8in */
  A0 = 4,
  /** A1 - 23.4in x 33.1in */
  A1 = 5,
  /** A2 - 16.54in x 23.4in */
  A2 = 6,
  /** A3 - 11.7in x 16.54in */
  A3 = 7,
  /** A4 - 8.27in x 11.7in */
  A4 = 8,
  /** A5 - 5.83in x 8.27in */
  A5 = 9,
  /** A6 - 4.13in x 5.83in */
  A6 = 10,
  UNRECOGNIZED = -1,
}

export enum PageOrientation {
  Portrait = 0,
  Landscape = 1,
  UNRECOGNIZED = -1,
}

export interface PrintPageRequest {
  htmlContent: string;
  pageFormat: PageFormat;
  pageOrientation: PageOrientation;
}

export interface PrintPageReply {
  mergedPdf: Uint8Array;
}

export interface BrowserServiceClient {
  printMultiplePage(request: Observable<PrintPageRequest>): Observable<PrintPageReply>;
}

export interface BrowserServiceController {
  printMultiplePage(
    request: Observable<PrintPageRequest>,
  ): Promise<PrintPageReply> | Observable<PrintPageReply> | PrintPageReply;
}

export function BrowserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("BrowserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ["printMultiplePage"];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("BrowserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const BROWSER_SERVICE_NAME = "BrowserService";
