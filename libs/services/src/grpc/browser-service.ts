/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Timestamp } from "./google/protobuf/timestamp";

export enum PatientCategory {
  Any = 0,
  YoungMale = 1,
  YoungFemale = 2,
  MatureMale = 3,
  MatureFemale = 4,
  Pregnant = 5,
  UNRECOGNIZED = -1,
}

export enum PatientGender {
  Male = 0,
  Female = 1,
  UNRECOGNIZED = -1,
}

export enum BranchType {
  Internal = 0,
  External = 1,
  UNRECOGNIZED = -1,
}

export interface SamplePrintMetadata {
  authorTitle: string;
  authorName: string;
  titleMargin: number;
}

export interface BaseEntity {
  Id: string;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
  isDeleted: boolean;
  deletedAt: Timestamp | undefined;
}

export interface NormalRule {
  category: PatientCategory;
  defaultChecked: boolean;
  normalValue: string;
  normalLowerBound: number;
  normalUpperBound: number;
  description: string;
  note: string;
}

export interface TestElement {
  displayIndex: number;
  name: string;
  printIndex: number;
  reportIndex: number;
  unit: string;
  isParent: boolean;
  normalRules: NormalRule[];
}

export interface SampleResultTestElement {
  testElementId: string;
  testElement: TestElement | undefined;
  value: string;
  isAbnormal: boolean;
}

export interface Patient {
  externalId: string;
  name: string;
  gender: PatientGender;
  birthYear: number;
  address: string;
  phoneNumber: string;
  SSN: string;
}

export interface Doctor {
  displayIndex: number;
  name: string;
}

export interface PatientType {
  displayIndex: number;
  name: string;
}

export interface Diagnosis {
  displayIndex: number;
  name: string;
}

export interface Branch {
  displayIndex: number;
  name: string;
  address: string;
  type: BranchType;
}

export interface SampleType {
  displayIndex: number;
  name: string;
}

export interface TestCategory {
  displayIndex: number;
  name: string;
  reportIndex: number;
}

export interface Test {
  displayIndex: number;
  name: string;
  shouldDisplayWithChildren: boolean;
}

export interface Sample {
  sampleId: string;
  note: string;
  isNgoaiGio: boolean;
  isTraBuuDien: boolean;
  isConfirmed: boolean;
  infoAt: Timestamp | undefined;
  sampledAt: Timestamp | undefined;
  printedAt: Timestamp | undefined;
  sampleCompleted: boolean;
  isPregnant: boolean;
  patientId: string;
  patient: Patient | undefined;
  doctorId: string;
  doctor: Doctor | undefined;
  patientTypeId: string;
  patientType: PatientType | undefined;
  diagnosisId: string;
  diagnosis: Diagnosis | undefined;
  originId: string;
  origin: Branch | undefined;
  sampleTypeIds: string[];
  sampleTypes: SampleType[];
  branchId: string;
  branch: Branch | undefined;
}

export interface SamplePrintData {
  sample: Sample | undefined;
  categories: TestCategory[];
}

export interface PrintSampleRequest {
  data: SamplePrintData | undefined;
  meta: SamplePrintMetadata | undefined;
}

export interface PrintSampleResponse {
  mergedPDF: Uint8Array;
}

export interface BrowserServiceClient {
  printSamples(request: Observable<PrintSampleRequest>): Observable<PrintSampleResponse>;
}

export interface BrowserServiceController {
  printSamples(
    request: Observable<PrintSampleRequest>,
  ): Promise<PrintSampleResponse> | Observable<PrintSampleResponse> | PrintSampleResponse;
}

export function BrowserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("BrowserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ["printSamples"];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("BrowserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const BROWSER_SERVICE_NAME = "BrowserService";
