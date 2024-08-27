import { Observable } from 'rxjs'

export const PDF_SERVICE_TOKEN = Symbol('PDF_SERVICE_TOKEN')

export interface IPdfService {
  mergePdf(pdf$: Observable<Buffer>): Promise<Buffer>
}
