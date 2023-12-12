import * as xlsx from 'xlsx'
import { DATEONLY_FORMAT, DATETIME_FORMAT } from '@diut/common'
import { Logger } from '@nestjs/common'

export abstract class BaseExportService<BodyDto> {
  protected logger: Logger

  constructor(className: string) {
    this.logger = new Logger(className)
  }

  abstract prepareAOA(body: BodyDto): Promise<Array<Array<string | Date>>>

  async exportWorksheet(body: BodyDto) {
    const aoaData = await this.prepareAOA(body)
    const worksheet = xlsx.utils.aoa_to_sheet(
      aoaData.filter((rowArray) => rowArray != null), // filter out null rows
      {
        dateNF: DATETIME_FORMAT,
      },
    )

    return worksheet
  }

  async exportWorksheetDateOnly(body: BodyDto) {
    const aoaData = await this.prepareAOA(body)
    const worksheet = xlsx.utils.aoa_to_sheet(
      aoaData.filter((rowArray) => rowArray != null), // filter out null rows
      {
        dateNF: DATEONLY_FORMAT,
      },
    )

    return worksheet
  }
}
