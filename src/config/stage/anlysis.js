const anlysisRouter = {
  route: null,
  name: null,
  title: '优化分析',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-weibiaoti--',
  filePath: 'view/anlysis/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '二级指标汇总',
      type: 'view',
      name: 'metric',
      route: '/anlysis/mertric',
      filePath: 'view/anlysis/metric.vue',
      inNav: true,
      icon: 'iconfont icon-weibiaoti--',
    },
    {
      title: '算法详情页面',
      type: 'view',
      name: 'algorithm',
      route: '/anlysis/detail',
      filePath: 'view/anlysis/algorithm-detail.vue',
      inNav: true,
      icon: 'iconfont icon-weibiaoti--',
    },
  ],
}

export default anlysisRouter
