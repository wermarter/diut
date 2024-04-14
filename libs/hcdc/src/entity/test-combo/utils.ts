import { Test } from '../test/entity'
import { TestCombo } from './entity'

export function separateTestCombo(input: {
  testIds: string[]
  tests: Test[]
  testCombos: TestCombo[]
}) {
  let testIds = [...input.testIds]
  const testCombos: TestCombo[] = []
  const tests: Test[] = []

  for (const testCombo of input.testCombos) {
    if (
      testCombo.testIds.every((testComboTestId) =>
        testIds.some((testId) => testComboTestId === testId),
      )
    ) {
      testCombos.push(testCombo)
      testIds = testIds.filter((testId) => !testCombo.testIds.includes(testId))
    }
  }

  for (const test of input.tests) {
    if (testIds.includes(test._id)) {
      tests.push(test)
    }
  }

  return {
    testCombos,
    tests,
  }
}
