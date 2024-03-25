type TestInput = {
  testCategory?: { displayIndex: number; reportIndex: number } | null
  displayIndex: number
}

export function allTestSortComparator(a: TestInput, b: TestInput) {
  if (a.testCategory?.displayIndex === b.testCategory?.displayIndex) {
    return a.displayIndex - b.displayIndex
  }

  return a.testCategory?.displayIndex! - b.testCategory?.displayIndex!
}

export function allTestReportSortComparator(a: TestInput, b: TestInput) {
  if (a.testCategory?.reportIndex === b.testCategory?.reportIndex) {
    return a.displayIndex - b.displayIndex
  }

  return a.testCategory?.reportIndex! - b.testCategory?.reportIndex!
}
