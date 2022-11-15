export enum AppSetting {
  isAuthorLocked = 'isAuthorLocked',
  authorPosition = 'authorPosition',
  authorName = 'authorName',
}

export interface AppSettingType {
  isAuthorLocked: boolean
  authorPosition: string
  authorName: string
}
