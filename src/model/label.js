/* eslint-disable */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'

class Label {
  async createLabel(data) {
    return _axios({
      method: 'post',
      url: 'label',
      data,
    })
  }

  async getAlgorithmLabels() {
    return _axios({
      method: 'get',
      url: 'label',
      params: {
        type: 0,
      },
    })
  }

  async getWaveLabels() {
    return _axios({
      method: 'get',
      url: 'label',
      params: {
        type: 1,
      },
    })
  }
}

export default new Label()
