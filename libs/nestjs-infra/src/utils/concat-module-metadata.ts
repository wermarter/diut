import { ModuleMetadata } from '@nestjs/common'

export function concatModuleMetadata(metadataList: ModuleMetadata[]) {
  const result: ModuleMetadata = {
    imports: [],
    controllers: [],
    providers: [],
    exports: [],
  }

  metadataList.forEach((metadata) => {
    if (metadata.imports && result.imports)
      result.imports = result.imports.concat(metadata.imports)

    if (metadata.controllers && result.controllers)
      result.controllers = result.controllers.concat(metadata.controllers)

    if (metadata.providers && result.providers)
      result.providers = result.providers.concat(metadata.providers)

    if (metadata.exports && result.exports)
      result.exports = result.exports.concat(metadata.exports)
  })

  return result
}
