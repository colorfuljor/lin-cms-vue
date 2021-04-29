/* eslint-disable */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'

class Label {
  async createLabel(data) {}

  async getAlgorithmLabels() {
    return [
      {
        text: 'Static threshold',
        value: 'Static threshold',
        desc: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
      },
      { text: 'Q-learning', value: 'Q-learning', desc: '' },
      { text: 'SARSA', value: 'SARSA', desc: '' },
      { text: 'ARIMA', value: 'ARIMA', desc: '' },
    ]
  }

  async getWaveLabels() {
    return [
      { text: 'Gentle', value: 'Gentle' },
      { text: 'Rise', value: 'Rise' },
      { text: 'Decline', value: 'Decline' },
      { text: 'Burst', value: 'Burst' },
      { text: 'Diurnal', value: 'Diurnal' },
      { text: 'Seasonal', value: 'Seasonal' },
    ]
  }
}

export default new Label()
