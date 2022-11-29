export function readFileToURL(file: File) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader()
    reader.addEventListener(
      'load',
      () => resolve(reader.result as string),
      false
    )
    reader.readAsDataURL(file)
  })
}
