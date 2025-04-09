import { PrintTemplate } from '@diut/hcdc'
import { PageFormat, PageOrientation } from '@diut/services'

type PrintTemplateConfig = {
  templatePath: string
  pageFormat: PageFormat
  pageOrientation: PageOrientation
}

export const printTemplateConfigs: Record<PrintTemplate, PrintTemplateConfig> =
  {
    [PrintTemplate.FormChung]: {
      templatePath: 'chung.ejs',
      pageFormat: PageFormat.A4,
      pageOrientation: PageOrientation.Portrait,
    },
    [PrintTemplate.FormHIV]: {
      templatePath: 'hiv.ejs',
      pageFormat: PageFormat.A5,
      pageOrientation: PageOrientation.Landscape,
    },
    [PrintTemplate.FormPap]: {
      templatePath: 'papsmear.ejs',
      pageFormat: PageFormat.A4,
      pageOrientation: PageOrientation.Portrait,
    },
    [PrintTemplate.FormSoiNhuom]: {
      templatePath: 'soi-nhuom.ejs',
      pageFormat: PageFormat.A5,
      pageOrientation: PageOrientation.Landscape,
    },
    [PrintTemplate.FormTD]: {
      templatePath: 'td.ejs',
      pageFormat: PageFormat.A4,
      pageOrientation: PageOrientation.Portrait,
    },
    [PrintTemplate.FormThinprep]: {
      templatePath: 'thinprep.ejs',
      pageFormat: PageFormat.A4,
      pageOrientation: PageOrientation.Portrait,
    },
  }
