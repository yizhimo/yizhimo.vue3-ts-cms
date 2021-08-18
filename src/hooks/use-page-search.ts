// 处理公共搜索的逻辑
import { ref } from 'vue'
import PageContent from '@/components/page-content'

// 重置，搜索 -> 更新数据
// search -> 父 -> content
export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }

  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }

  return [pageContentRef, handleResetClick, handleQueryClick]
}
