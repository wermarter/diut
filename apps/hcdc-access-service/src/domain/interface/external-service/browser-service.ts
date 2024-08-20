import { PrintPageReply, PrintPageRequest } from '@diut/services'
import { Observable } from 'rxjs'

export const BROWSER_SERVICE_TOKEN = Symbol('BrowserService')
export interface IBrowserService {
  printMultiplePage(
    request: Observable<PrintPageRequest>,
  ): Observable<PrintPageReply>
}
