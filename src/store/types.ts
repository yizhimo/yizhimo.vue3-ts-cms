import { ILoginState } from './login/types'

export interface IRootState {
  name: string
  age: number
}

export interface IRootWithModule {
  login: ILoginState
}

// 导出vuex所有类型
export type IStoreType = IRootState & IRootWithModule
