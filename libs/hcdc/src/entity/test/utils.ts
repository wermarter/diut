type TestInput = {
  testCategory?: { displayIndex: number; reportIndex: number } | null
  displayIndex: number
}

export function allTestSortComparator(a: TestInput, b: TestInput) {
  const aCategoryIndex = a.testCategory?.displayIndex ?? 0
  const bCategoryIndex = b.testCategory?.displayIndex ?? 0

  if (aCategoryIndex === bCategoryIndex) {
    return a.displayIndex - b.displayIndex
  }

  return aCategoryIndex - bCategoryIndex
}

export function allTestReportSortComparator(a: TestInput, b: TestInput) {
  const aCategoryIndex = a.testCategory?.reportIndex ?? 0
  const bCategoryIndex = b.testCategory?.reportIndex ?? 0

  if (aCategoryIndex === bCategoryIndex) {
    return a.displayIndex - b.displayIndex
  }

  return aCategoryIndex - bCategoryIndex
}
