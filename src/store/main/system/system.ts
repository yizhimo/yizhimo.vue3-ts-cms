import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ISystemState } from './types'
import { ElMessage } from 'element-plus'

import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      // 用户管理
      usersList: [],
      usersCount: 0,

      // 角色管理
      roleList: [],
      roleCount: 0,

      // 商品列表
      goodsList: [],
      goodsCount: 0,

      // 权限列表
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },

    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count
    },

    changeGoodsList(state, list: any[]) {
      state.goodsList = list
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count
    },

    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
        // switch (pageName) {
        //   case 'users':
        //     return state.usersList
        //   case 'role':
        //     return state.roleList
        // }
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    // 获取列表信息
    async getPageListAction({ commit }, payload: any) {
      // 获取对应接口
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`
      // switch (pageName) {
      //   case 'users':
      //     pageUrl = '/users/list'
      //     break
      //   case 'role':
      //     pageUrl = '/role/list'
      //     break
      // }

      // 发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      // 将数据存到vuex中
      const { list, totalCount } = pageResult.data
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)

      //   commit('changeUserList', list)
      //   commit('changeUserCount', totalCount)
    },

    // 删除
    async deletePageDataAction({ dispatch }, payload: any) {
      // 接口规则 pageName -> /users  id -> /users/id
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`

      // 调用删除接口
      const deleteData = await deletePageData(pageUrl)
      switch (deleteData.code) {
        case -1002:
          ElMessage.error(deleteData.data)
          break
        case 0:
          ElMessage.success(deleteData.data)
          break
        default:
          break
      }

      // 刷新-重新请求
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    // 新建
    async createPageDataAction({ dispatch }, payload: any) {
      // 1.创建数据的请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`

      // 调用新建接口
      const createData = await createPageData(pageUrl, newData)
      switch (createData.code) {
        case 400:
          ElMessage.error(createData.data)
          break
        case 0:
          ElMessage.success(createData.data)
          break
        default:
          break
      }

      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    // 编辑
    async editPageDataAction({ dispatch }, payload: any) {
      // 1.编辑数据的请求
      const { pageName, editData, id } = payload
      console.log(editData)

      const pageUrl = `/${pageName}/${id}`

      const modifyData = await editPageData(pageUrl, editData)
      switch (modifyData.code) {
        case 400:
          ElMessage.error(modifyData.data)
          break
        case 0:
          ElMessage.success(modifyData.data)
          break
        default:
          break
      }

      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
