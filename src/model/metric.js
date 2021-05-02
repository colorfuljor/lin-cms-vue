/* eslint-disable */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'

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
    return [
      {
        algorithm: 'Q-learning',
        wave: 'Gentle',
        collector: 'test',
        reliability: 100.0,
        availability: 100.0,
        stability: 0.02744,
        meanPod: 3.37,
        elasticity: 12.99,
        slaSatisfaction: 99.78,
      },
      {
        algorithm: 'Static Threshold',
        wave: 'Gentle',
        collector: 'test',
        reliability: 99.55,
        availability: 97.44,
        stability: 0.01514,
        meanPod: 3.04,
        elasticity: 42.16,
        slaSatisfaction: 93.36,
      },
    ]
    // return _axios({
    //   method: 'get',
    //   url: 'analysis/metrics',
    // })
  }

  async getMetricMeans() {
    return {
      'Q-learning': {
        Gentle: {
          reliability: 100.0,
          availability: 100.0,
          stability: 0.02744,
          meanPod: 3.37,
          elasticity: 12.99,
          slaSatisfaction: 99.78,
        },
      },
      'Static Threshold': {
        Gentle: {
          reliability: 99.55,
          availability: 97.44,
          stability: 0.01514,
          meanPod: 3.04,
          elasticity: 42.16,
          slaSatisfaction: 93.36,
        },
      },
    }
    // return _axios({
    //   method: 'get',
    //   url: 'analysis/mean',
    // })
  }

  async getPersonalMetricMeans() {
    return {
      'Q-learning': {
        Gentle: {
          reliability: 100.0,
          availability: 100.0,
          stability: 0.02744,
          meanPod: 3.37,
          elasticity: 12.99,
          slaSatisfaction: 99.78,
        },
      },
    }
    // return _axios({
    //   method: 'get',
    //   url: 'analysis/mean',
    // })
  }
}

export default new Metric()
