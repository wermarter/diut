type TestInput = {
  testCategory?: { displayIndex: number } | null
  displayIndex: number
}

export function allTestSortComparator(a: TestInput, b: TestInput) {
  if (a.testCategory?.displayIndex === b.testCategory?.displayIndex) {
    return a.displayIndex - b.displayIndex
  }

  return a.testCategory?.displayIndex! - b.testCategory?.displayIndex!
}
