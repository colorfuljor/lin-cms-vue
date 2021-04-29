/* eslint-disable */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'

class Collect {
  async createCollect(data) {
    return _axios({
      method: 'post',
      url: 'collect/create',
      data,
    })
  }

  async getCollects() {
    return [
      {
        algorithm: 'Q-learning',
        wave: 'Gentle',
        collector: 'test',
        collectTime: '2021-04-10',
      },
      {
        algorithm: 'Static threshold',
        wave: 'Gentle',
        collector: 'test',
        collectTime: '2021-04-10',
      },
    ]
  }
}

export default new Collect()
