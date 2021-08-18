// 处理角色权限
import { useStore } from '@/store'

export function usePermission(pageName: string, hanldeName: string) {
  const store = useStore()

  const permissions = store.state.login.permissions
  // 验证权限规则
  const verifyPermission = `system:${pageName}:${hanldeName}`

  return !!permissions.find((item) => item === verifyPermission)
}
