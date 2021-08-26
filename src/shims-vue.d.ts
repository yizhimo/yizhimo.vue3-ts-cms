/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare let $store: any

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.json'
