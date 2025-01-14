import anlysisConfig from './anlysis'
import Utils from '@/lin/util/util'

// eslint-disable-next-line import/no-mutable-exports
const homeRouter = [
  {
    title: '首页',
    type: 'view',
    name: Symbol('Dashborad'),
    route: '/main',
    filePath: 'view/main/main.vue',
    inNav: true,
    icon: 'iconfont icon-home',
    order: 1,
  },
  {
    title: '数据收集',
    type: 'view',
    name: Symbol('Collect'),
    route: '/collect',
    filePath: 'view/collect/collect-main.vue',
    inNav: true,
    icon: 'iconfont icon-database',
    order: 1,
  },
  anlysisConfig,
  // {
  //   title: '日志管理',
  //   type: 'view',
  //   name: Symbol('log'),
  //   route: '/log',
  //   filePath: 'view/log/log.vue',
  //   inNav: true,
  //   icon: 'iconfont icon-rizhiguanli',
  //   order: 2,
  // },
  {
    title: '个人中心',
    type: 'view',
    name: Symbol('center'),
    route: '/center',
    filePath: 'view/center/center.vue',
    inNav: false,
    icon: 'iconfont icon-rizhiguanli',
  },
  {
    title: '404',
    type: 'view',
    name: Symbol('404'),
    route: '/404',
    filePath: 'view/error-page/404.vue',
    inNav: false,
    icon: 'iconfont icon-rizhiguanli',
  },
]

// const plugins = [...pluginsConfig]

// 筛除已经被添加的插件
// function filterPlugin(data) {
//   if (plugins.length === 0) {
//     return
//   }
//   if (Array.isArray(data)) {
//     data.forEach(item => {
//       filterPlugin(item)
//     })
//   } else {
//     const findResult = plugins.findIndex(item => data === item)
//     if (findResult >= 0) {
//       plugins.splice(findResult, 1)
//     }
//     if (data.children) {
//       filterPlugin(data.children)
//     }
//   }
// }

// filterPlugin(homeRouter)

// homeRouter = homeRouter.concat(plugins)

// 处理顺序
// homeRouter = Utils.sortByOrder(homeRouter)

// 使用 Symbol 处理 name 字段, 保证唯一性
const deepReduceName = target => {
  if (Array.isArray(target)) {
    target.forEach(item => {
      if (typeof item !== 'object') {
        return
      }
      deepReduceName(item)
    })
    return
  }
  if (typeof target === 'object') {
    if (typeof target.name !== 'symbol') {
      // eslint-disable-next-line no-param-reassign
      target.name = target.name || Utils.getRandomStr()
      // eslint-disable-next-line no-param-reassign
      target.name = Symbol(target.name)
    }

    if (Array.isArray(target.children)) {
      target.children.forEach(item => {
        if (typeof item !== 'object') {
          return
        }
        deepReduceName(item)
      })
    }
  }
}

deepReduceName(homeRouter)

export default homeRouter
