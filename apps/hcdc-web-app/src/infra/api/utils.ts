function extractFilename(response: Response) {
  const header = response.headers.get('Content-Disposition')
  const parts = header?.split(';')
  const filename = parts?.[1]?.split('=')[1]?.replaceAll('"', '')

  return filename
}

const DEFAULT_FILENAME = 'hcdc-web-app.download'

export function fileReponseHandler(input: {
  mode: 'preview' | 'download' | 'url'
  filename?: string
}) {
  return async (response: Response) => {
    const filename = extractFilename(response)
    const objectURL = (window.URL ?? window.webkitURL).createObjectURL(
      await response.blob(),
    )

    if (input.mode === 'url') {
      return objectURL
    }

    const hiddenElement = document.createElement('a')
    hiddenElement.href = objectURL
    hiddenElement.target = '_blank'

    if (input.mode === 'download') {
      if (input.filename !== undefined) {
        hiddenElement.download = input.filename
      } else {
        hiddenElement.download =
          filename?.length! > 0 ? filename! : DEFAULT_FILENAME
      }
    }

    hiddenElement.click()

    URL.revokeObjectURL(objectURL)
  }
}
