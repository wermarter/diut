import { PatientCategory } from '../patient'
import { TestElement } from './entity'

export function isTestElementNormal(
  patientCategory: PatientCategory,
  testElement: TestElement,
  value: string,
) {
  const rule = testElement.normalRules.find(
    (rule) => rule.category === patientCategory,
  )
  if (rule === undefined) {
    // no rule? guess it is normal
    return true
  }

  const { normalValue, normalLowerBound, normalUpperBound } = rule

  if (normalLowerBound !== undefined && normalUpperBound !== undefined) {
    const numericValue = parseFloat(value)
    return numericValue >= normalLowerBound && numericValue <= normalUpperBound
  }

  if (normalLowerBound !== undefined) {
    const numericValue = parseFloat(value)
    return numericValue >= normalLowerBound
  }

  if (normalUpperBound !== undefined) {
    const numericValue = parseFloat(value)
    return numericValue <= normalUpperBound
  }

  if (normalValue?.length! > 0) {
    return value === normalValue
  }

  return true
}
