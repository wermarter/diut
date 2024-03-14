import { PrintSampleRequest } from '@diut/services'
import { Injectable } from '@nestjs/common'
import assert from 'assert'

@Injectable()
export class BrowserService {
  printSample(request: PrintSampleRequest) {
    assert(request.data, 'data is required')
    assert(request.meta, 'meta is required')

    return JSON.stringify(request, null, 2)
  }
}
