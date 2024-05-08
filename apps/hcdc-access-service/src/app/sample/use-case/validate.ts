import { Inject, Injectable } from '@nestjs/common'
import {
  AuthSubject,
  Sample,
  BranchAction,
  SampleTypeAction,
  TestAction,
  TestElementAction,
  UserAction,
  PatientAction,
  PatientTypeAction,
  DiagnosisAction,
  SampleTestResultAction,
  SampleResultTest,
} from '@diut/hcdc'

import {
  EntityData,
  assertPermission,
  AuthContextToken,
  IAuthContext,
  UserRepositoryToken,
  IUserRepository,
} from 'src/domain'
import { BranchAssertExistsUseCase } from '../../branch/use-case/assert-exists'
import { SampleTypeAssertExistsUseCase } from '../../sample-type/use-case/assert-exists'
import { TestAssertExistsUseCase } from '../../test/use-case/assert-exists'
import { TestElementAssertExistsUseCase } from '../../test-element/use-case/assert-exists'
import { UserAssertExistsUseCase } from '../../user/use-case/assert-exists'
import { PatientAssertExistsUseCase } from '../../patient/use-case/assert-exists'
import { DoctorAssertExistsUseCase } from '../../doctor/use-case/assert-exists'
import { PatientTypeAssertExistsUseCase } from '../../patient-type/use-case/assert-exists'
import { DiagnosisAssertExistsUseCase } from '../../diagnosis/use-case/assert-exists'

@Injectable()
export class SampleValidateUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
    private readonly sampleTypeAssertExistsUseCase: SampleTypeAssertExistsUseCase,
    private readonly testAssertExistsUseCase: TestAssertExistsUseCase,
    private readonly testElementAssertExistsUseCase: TestElementAssertExistsUseCase,
    private readonly userAssertExistsUseCase: UserAssertExistsUseCase,
    private readonly patientAssertExistsUseCase: PatientAssertExistsUseCase,
    private readonly doctorAssertExistsUseCase: DoctorAssertExistsUseCase,
    private readonly patientTypeAssertExistsUseCase: PatientTypeAssertExistsUseCase,
    private readonly diagnosisAssertExistsUseCase: DiagnosisAssertExistsUseCase,
  ) {}

  async execute(input: Partial<EntityData<Sample>>, sample?: Sample) {
    const { ability } = this.authContext.getData()
    const {
      results,
      infoById,
      printedById,
      patientId,
      doctorId,
      patientTypeId,
      diagnosisId,
      originId,
      sampleTypeIds,
      branchId,
    } = input

    if (results?.length) {
      for (const testResult of results) {
        const { testId, elements, resultById } = testResult

        if (resultById) {
          const user = await this.userAssertExistsUseCase.execute({
            _id: resultById,
          })
          assertPermission(ability, AuthSubject.User, UserAction.Read, user)
        }

        const test = await this.testAssertExistsUseCase.execute({
          _id: testId,
        })
        assertPermission(ability, AuthSubject.Test, TestAction.Read, test)

        for (const element of elements) {
          const { testElementId } = element
          const sample = await this.testElementAssertExistsUseCase.execute({
            _id: testElementId,
            testId,
          })
          assertPermission(
            ability,
            AuthSubject.TestElement,
            TestElementAction.Read,
            sample,
          )
        }

        // validate result update
        if (sample) {
          const oldResult = sample.results.find(
            ({ testId }) => testId === testResult.testId,
          )!
          oldResult.test = test
          oldResult.resultBy = await this.userRepository.findById(
            oldResult.resultById!,
          )

          assertPermission(
            ability,
            AuthSubject.SampleTestResult,
            SampleTestResultAction.Modify,
            oldResult as Required<SampleResultTest>,
          )
        }
      }
    }

    if (infoById !== undefined) {
      const user = await this.userAssertExistsUseCase.execute({
        _id: infoById,
      })
      assertPermission(ability, AuthSubject.User, UserAction.Read, user)
    }

    if (printedById !== undefined) {
      const user = await this.userAssertExistsUseCase.execute({
        _id: printedById,
      })
      assertPermission(ability, AuthSubject.User, UserAction.Read, user)
    }

    if (patientId !== undefined) {
      const patient = await this.patientAssertExistsUseCase.execute({
        _id: patientId,
      })
      assertPermission(
        ability,
        AuthSubject.Patient,
        PatientAction.Read,
        patient,
      )
    }

    if (doctorId !== undefined) {
      const doctor = await this.doctorAssertExistsUseCase.execute({
        _id: doctorId,
      })
      assertPermission(ability, AuthSubject.Patient, PatientAction.Read, doctor)
    }

    if (patientTypeId !== undefined) {
      const patientType = await this.patientTypeAssertExistsUseCase.execute({
        _id: patientTypeId,
      })
      assertPermission(
        ability,
        AuthSubject.PatientType,
        PatientTypeAction.Read,
        patientType,
      )
    }

    if (diagnosisId !== undefined) {
      const diagnosis = await this.diagnosisAssertExistsUseCase.execute({
        _id: diagnosisId,
      })
      assertPermission(
        ability,
        AuthSubject.Diagnosis,
        DiagnosisAction.Read,
        diagnosis,
      )
    }

    if (originId !== undefined) {
      const branch = await this.branchAssertExistsUseCase.execute({
        _id: originId,
      })
      assertPermission(ability, AuthSubject.Branch, BranchAction.Read, branch)
    }

    if (sampleTypeIds?.length) {
      for (const sampleTypeId of sampleTypeIds) {
        const sampleType = await this.sampleTypeAssertExistsUseCase.execute({
          _id: sampleTypeId,
        })
        assertPermission(
          ability,
          AuthSubject.SampleType,
          SampleTypeAction.Read,
          sampleType,
        )
      }
    }

    if (branchId !== undefined) {
      const branch = await this.branchAssertExistsUseCase.execute({
        _id: branchId,
      })
      assertPermission(ability, AuthSubject.Branch, BranchAction.Read, branch)
    }
  }
}
