/* eslint-disable */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'

class Collect {
  async createCollect(data) {
    return _axios({
      method: 'post',
      url: 'collect',
      data,
    })
  }

  async getCollects() {
    return _axios({
      method: 'get',
      url: 'collect',
    })
  }
}

export default new Collect()
