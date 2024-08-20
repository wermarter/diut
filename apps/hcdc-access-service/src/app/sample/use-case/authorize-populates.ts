import { Inject, Injectable } from '@nestjs/common'
import {
  AuthSubject,
  BranchAction,
  TestAction,
  Sample,
  SampleTypeAction,
  UserAction,
  TestElementAction,
  PatientAction,
  DoctorAction,
  PatientTypeAction,
  DiagnosisAction,
} from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  EntityFindOneOptions,
  IAuthContext,
  EEntityPopulatePathUnknown,
  authorizePopulates,
} from 'src/domain'

@Injectable()
export class SampleAuthorizePopulatesUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
  ) {}

  execute(input: EntityFindOneOptions<Sample>['populates']) {
    const { ability } = this.authContext.getData()

    return authorizePopulates(ability, input, (path) => {
      switch (path) {
        case 'results.test':
          return {
            subject: AuthSubject.Test,
            action: TestAction.Read,
          }
        case 'results.resultBy':
          return {
            subject: AuthSubject.User,
            action: UserAction.Read,
          }
        case 'results.elements.testElement':
          return {
            subject: AuthSubject.TestElement,
            action: TestElementAction.Read,
          }
        case 'infoBy':
          return {
            subject: AuthSubject.User,
            action: UserAction.Read,
          }
        case 'printedBy':
          return {
            subject: AuthSubject.User,
            action: UserAction.Read,
          }
        case 'patient':
          return {
            subject: AuthSubject.Patient,
            action: PatientAction.Read,
          }
        case 'doctor':
          return {
            subject: AuthSubject.Doctor,
            action: DoctorAction.Read,
          }
        case 'patientType':
          return {
            subject: AuthSubject.PatientType,
            action: PatientTypeAction.Read,
          }
        case 'diagnosis':
          return {
            subject: AuthSubject.Diagnosis,
            action: DiagnosisAction.Read,
          }
        case 'origin':
          return {
            subject: AuthSubject.Branch,
            action: BranchAction.Read,
          }
        case 'sampleTypes':
          return {
            subject: AuthSubject.SampleType,
            action: SampleTypeAction.Read,
          }
        case 'branch':
          return {
            subject: AuthSubject.Branch,
            action: BranchAction.Read,
          }
        default:
          throw new EEntityPopulatePathUnknown(path)
      }
    })
  }
}
