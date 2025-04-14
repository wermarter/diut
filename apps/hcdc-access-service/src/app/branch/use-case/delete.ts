import { AuthSubject, Branch, BranchAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { FilterQuery } from 'mongoose'
import { assertPermission } from 'src/app/auth/common'
import { DiagnosisDeleteUseCase } from 'src/app/diagnosis/use-case/delete'
import { DoctorDeleteUseCase } from 'src/app/doctor/use-case/delete'
import { PatientTypeDeleteUseCase } from 'src/app/patient-type/use-case/delete'
import { PatientDeleteUseCase } from 'src/app/patient/use-case/delete'
import { PrintFormDeleteUseCase } from 'src/app/print-form/use-case/delete'
import { RoleDeleteUseCase } from 'src/app/role/use-case/delete'
import { TestComboDeleteUseCase } from 'src/app/test-combo/use-case/delete'
import { TestDeleteUseCase } from 'src/app/test/use-case/delete'
import { UserDeleteUseCase } from 'src/app/user/use-case/delete'
import {
  AUTH_CONTEXT_TOKEN,
  BRANCH_REPO_TOKEN,
  IAuthContext,
  IBranchRepository,
} from 'src/domain'
import { BranchSearchUseCase } from './search'

@Injectable()
export class BranchDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(BRANCH_REPO_TOKEN)
    private readonly branchRepository: IBranchRepository,
    private readonly branchSearchUseCase: BranchSearchUseCase,
    private readonly patientDeleteUseCase: PatientDeleteUseCase,
    private readonly testDeleteUseCase: TestDeleteUseCase,
    private readonly testComboDeleteUseCase: TestComboDeleteUseCase,
    private readonly diagnosisDeleteUseCase: DiagnosisDeleteUseCase,
    private readonly doctorDeleteUseCase: DoctorDeleteUseCase,
    private readonly patientTypeDeleteUseCase: PatientTypeDeleteUseCase,
    private readonly printFormDeleteUseCase: PrintFormDeleteUseCase,
    private readonly userDeleteUseCase: UserDeleteUseCase,
    private readonly roleDeleteUseCase: RoleDeleteUseCase,
  ) {}

  async execute(input: FilterQuery<Branch>) {
    const { ability } = this.authContext.getData()
    const { items: branches } = await this.branchSearchUseCase.execute({
      filter: input,
    })

    for (const branch of branches) {
      assertPermission(ability, AuthSubject.Branch, BranchAction.Delete, branch)

      // patient and all related sample
      await this.patientDeleteUseCase.execute({ branchId: branch._id })

      // infra
      await this.testComboDeleteUseCase.execute({ branchId: branch._id })
      await this.testDeleteUseCase.execute({ branchId: branch._id })
      await this.diagnosisDeleteUseCase.execute({ branchId: branch._id })
      await this.doctorDeleteUseCase.execute({ branchId: branch._id })
      await this.patientTypeDeleteUseCase.execute({ branchId: branch._id })
      await this.printFormDeleteUseCase.execute({ branchId: branch._id })
      await this.userDeleteUseCase.execute({ branchId: branch._id })
      await this.roleDeleteUseCase.execute({ branchId: branch._id })

      // finally
      await this.branchRepository.deleteById(branch._id)
    }
  }
}
