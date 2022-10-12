import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import * as _ from 'lodash'

/**
 * ---------------------------------------------------------------------------------
 * INPUT
 * ---------------------------------------------------------------------------------
 */

const single = process.argv[2]
const plural = process.argv[3]

if (_.isEmpty(single) || _.isEmpty(plural)) {
  console.log(
    `Please follow syntax:\n\t yarn g:resource "lowercase singular" "lowercase plural" `
  )
  process.exit(1)
}

/**
 * ---------------------------------------------------------------------------------
 * PREPARE
 * ---------------------------------------------------------------------------------
 */

const names = {
  single,
  singleUpper: _.snakeCase(single).toUpperCase(),
  singleKebab: _.kebabCase(single),
  singleCamel: _.camelCase(single),
  singlePascal: _.upperFirst(_.camelCase(single)),

  plural,
  pluralUpper: _.snakeCase(plural).toUpperCase(),
  pluralKebab: _.kebabCase(plural),
  pluralCamel: _.camelCase(plural),
  pluralPascal: _.upperFirst(_.camelCase(plural)),
}

const templatePath = './generators/resource/templates'
const resourcePath = `./src/resources/${names.pluralKebab}`
const dtoPath = `${resourcePath}/dtos`

if (existsSync(resourcePath)) {
  console.error(`PATH: ${resourcePath} already exists!`)
  process.exit(1)
} else {
  mkdirSync(resourcePath)
}

if (existsSync(dtoPath)) {
  console.error(`PATH: ${dtoPath} already exists!`)
  process.exit(1)
} else {
  mkdirSync(dtoPath)
}

function generate(template: string, destination: string) {
  const controller = _.template(
    readFileSync(`${templatePath}/${template}`).toString()
  )
  writeFileSync(`${resourcePath}/${destination}`, controller(names))
  console.log('|', destination)
}

/**
 * ---------------------------------------------------------------------------------
 * GENERATE RESOURCE FILES
 * ---------------------------------------------------------------------------------
 */

generate('index.template', 'index.ts')

generate('controller.template', `${names.singleKebab}.controller.ts`)
generate('module.template', `${names.singleKebab}.module.ts`)
generate('routes.template', `${names.singleKebab}.routes.ts`)
generate('schema.template', `${names.singleKebab}.schema.ts`)
generate('service.template', `${names.singleKebab}.service.ts`)

generate(
  'dtos/create.request.template',
  `dtos/create-${names.singleKebab}.request-dto.ts`
)
generate(
  'dtos/search.request.template',
  `dtos/search-${names.singleKebab}.request-dto.ts`
)
generate(
  'dtos/search.response.template',
  `dtos/search-${names.singleKebab}.response-dto.ts`
)
generate(
  'dtos/update.request.template',
  `dtos/update-${names.singleKebab}.request-dto.ts`
)
generate('dtos/response.template', `dtos/${names.singleKebab}.response-dto.ts`)

console.log('--------------------------------------------------')

console.log(`${resourcePath}/${names.singleKebab}.schema.ts`)
console.log(`${resourcePath}/dtos/create-${names.singleKebab}.request-dto.ts`)
console.log(`${resourcePath}/dtos/${names.singleKebab}.response-dto.ts`)

console.log('--------------------------------------------------')
console.log(`${resourcePath}/index.ts`)
