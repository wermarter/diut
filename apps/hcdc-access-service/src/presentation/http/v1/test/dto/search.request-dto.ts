import { SearchRequestDto } from '@diut/nestjs-infra'

import { Test } from 'src/domain'

export class TestSearchRequestDto extends SearchRequestDto<Test> {}
