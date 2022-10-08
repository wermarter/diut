import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import * as _ from 'lodash'

const resourceName = 'patient'
const resourceGroup = 'patients'

const resourceCapital = _.capitalize(resourceName)

const templatePath = './templates/resource'
const resourcePath = `./src/resources/${resourceGroup}`

if (existsSync(resourcePath)) {
  console.error(`PATH: ${resourcePath} already exists!`)
  process.exit()
}

mkdirSync(resourcePath)

const controller = _.template(
  readFileSync(`${templatePath}/controller.template`).toString()
)

writeFileSync(
  `./src/resources/${resourceGroup}/${resourceName}.controller.ts`,
  controller({ testParam: 'ehe!' })
)
