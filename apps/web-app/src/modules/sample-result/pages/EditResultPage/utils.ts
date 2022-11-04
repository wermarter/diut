import { PatientCategory } from '@diut/common'
import { HighlightRuleDto } from 'src/api/test-element'

export function getTechnicalHint(
  patientCategory: PatientCategory,
  highlightRules: HighlightRuleDto[]
) {
  const highlightRule =
    highlightRules.find(({ category }) => category === patientCategory) ??
    highlightRules.find(({ category }) => category === PatientCategory.Any) ??
    ({} as HighlightRuleDto)

  const { min, max, normalValue, description, category } = highlightRule

  let categoryPrefix = '' // Any
  if (category === PatientCategory.Man) {
    categoryPrefix = 'Nam: '
  }
  if (category === PatientCategory.Woman) {
    categoryPrefix = 'Nữ: '
  }
  if (category === PatientCategory.Boy) {
    categoryPrefix = 'Bé trai: '
  }
  if (category === PatientCategory.Girl) {
    categoryPrefix = 'Bé gái: '
  }
  if (category === PatientCategory.Pregnant) {
    categoryPrefix = 'Thai phụ: '
  }

  // if (description?.length! > 0) {
  //   return categoryPrefix + description
  // }

  if (normalValue?.length! > 0) {
    return categoryPrefix + normalValue
  }
  if (min != undefined && max != undefined) {
    return `${categoryPrefix}${min} - ${max}`
  }
  if (min != undefined) {
    return `${categoryPrefix}min = ${min}`
  }
  if (max != undefined) {
    return `${categoryPrefix}max = ${max}`
  }

  return ''
}

export function checkHighlight(highlightRule: HighlightRuleDto, value: string) {
  const { min, max, normalValue } = highlightRule

  if (min != undefined && max != undefined) {
    return Number(value) < min || Number(value) > max
  }

  if (min != undefined) {
    return Number(value) > min
  }

  if (max != undefined) {
    return Number(value) < max
  }

  if (normalValue?.length! > 0) {
    return value !== normalValue
  }

  return false
}
