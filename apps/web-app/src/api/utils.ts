function extractFilename(response: Response) {
  const header = response.headers.get('Content-Disposition')
  const parts = header?.split(';')
  const filename = parts?.[1]?.split('=')[1]?.replaceAll('"', '')

  return filename
}

export function fileDownloadReponseHandler({
  defaultFilename,
}: {
  defaultFilename?: string
}) {
  return async (response: Response) => {
    const filename = extractFilename(response)
    const objectURL = (window.URL ?? window.webkitURL).createObjectURL(
      await response.blob()
    )

    // Download the file
    const hiddenElement = document.createElement('a')
    hiddenElement.href = objectURL
    hiddenElement.target = '_blank'
    hiddenElement.download =
      filename?.length! > 0 ? filename! : defaultFilename ?? 'HCDC_Lab_Web'
    hiddenElement.click()

    URL.revokeObjectURL(objectURL)
    return objectURL
  }
}
