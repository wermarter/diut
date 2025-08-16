import { PatientCategory } from '../patient'
import { NormalRule, TestElement } from './entity'

export function isTestElementNormal(
  patientCategory: PatientCategory,
  testElement: Pick<TestElement, 'normalRules'>,
  value: string,
) {
  const rule = testElement.normalRules.find(
    (rule) => rule.category === patientCategory,
  )

  return isTestElementValueNormal(rule, value)
}

export function isTestElementValueNormal(
  rule: NormalRule | undefined,
  value: string,
) {
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

export function formatNormalRuleDisplayText(
  rule: NormalRule | undefined,
): string {
  if (rule === undefined) {
    return ''
  }

  const { normalValue, normalLowerBound, normalUpperBound } = rule

  if (normalLowerBound !== undefined && normalUpperBound !== undefined) {
    return `[${normalLowerBound}] ≤ X ≤ [${normalUpperBound}]`
  }

  if (normalLowerBound !== undefined) {
    return `X ≥ [${normalLowerBound}]`
  }

  if (normalUpperBound !== undefined) {
    return `X ≤ [${normalUpperBound}]`
  }

  if (normalValue?.length! > 0) {
    return normalValue
  }

  return ''
}
