export enum WebAppPage {
  SoNhanMau = 'SoNhanMau',
  TimKiemBenhNhan = 'TimKiemBenhNhan',
  XuatBaoCao = 'XuatBaoCao',
}

export type WebApp = {
  page: WebAppPage
}

export enum WebAppAction {
  View = 'View',
}
