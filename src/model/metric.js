/* eslint-disable */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'
import store from '@/store'

class Metric {
  metricNameMap = {
    reliability: '稳定性',
    availability: '可用性',
    stability: '服务稳定性',
    meanPod: '平均容器数',
    elasticity: '弹性',
    slaSatisfaction: 'SLA满足度',
  }

  async getAllMetrics() {
    return _axios({
      method: 'get',
      url: 'analysis/metrics',
    })
  }

  async getMetricMeans() {
    return _axios({
      method: 'get',
      url: 'analysis/means',
    })
  }

  async getPersonalMetricMeans(username) {
    return _axios({
      method: 'get',
      url: 'analysis/means',
      params: {
        username: username,
      },
    })
  }
}

export default new Metric()
