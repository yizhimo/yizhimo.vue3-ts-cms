import hyRequest from '../../index'

import { IDataType } from '../../types'

// 获取表格数据
export function getPageListData(url: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
