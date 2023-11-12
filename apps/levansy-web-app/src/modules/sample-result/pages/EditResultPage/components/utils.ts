import { PrintForm } from '@diut/levansy-common'

import { BioProductResponseDto } from 'src/api/bio-product'
import { TestResultDto } from 'src/api/sample'
import { TestCategoryResponseDto } from 'src/api/test-category'
import { HighlightRuleDto, TestElementResponseDto } from 'src/api/test-element'
import { UserResponseDto } from 'src/api/user'

export interface ResultCardProps {
  currentTestInfo: {
    result: TestResultDto | undefined
    _id: string
    createdAt: string
    updatedAt: string
    category: TestCategoryResponseDto
    bioProduct?: BioProductResponseDto | undefined
    name: string
    index: number
    printForm: PrintForm
    elements: TestElementResponseDto[]
  }
  currentTestState: {
    isLocked: boolean
    resultBy?: UserResponseDto
    resultAt?: Date
  }
  elementState: {
    [elementId: string]: {
      checked: boolean
      value: string
    }
  }
  setElementState: (
    elementId: string,
    { checked, value }: { checked?: boolean; value?: string },
  ) => void
  getHighlightRule: (highlightRules: HighlightRuleDto[]) => HighlightRuleDto
  sampleId: string
}
