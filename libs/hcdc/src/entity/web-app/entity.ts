export enum WebAppPage {
  SoNhanMau = 'SoNhanMau',
  XuatBaoCao = 'XuatBaoCao',
}

export type WebApp = {
  page: WebAppPage
  meta: unknown
}

export enum WebAppAction {
  View = 'View',
  Export = 'Export',
}
