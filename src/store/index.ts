import { createStore, Store, useStore as useVuexStore } from 'vuex'

import login from './login/login'

import { IStoreType, IRootState } from './types'

const store = createStore<IRootState>({
  state: () => {
    return {
      nickname: 'yzm',
      name: '',
      age: 18
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

// 导出vuex(带类型)
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
