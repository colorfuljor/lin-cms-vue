<template>
  <div class="container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="所有收集数据" name="all">
        <div class="all">
          <el-table :data="allList" style="border: solid 2px #DCDFE6;border-radius: 8px;padding: 0 10px" stripe>
            <el-table-column prop="algorithm" label="算法" :filters="algorithms" :filter-method="filterAlgorithm">
            </el-table-column>
            <el-table-column prop="wave" label="流量波形" :filters="waves" :filter-method="filterWave">
            </el-table-column>
            <el-table-column prop="reliability" label="可靠性" sortable>
              <template slot-scope="scope">
                {{ scope.row.reliability }}%
              </template>
            </el-table-column>
            <el-table-column prop="availability" label="可用性" sortable>
              <template slot-scope="scope">
                {{ scope.row.availability }}%
              </template>
            </el-table-column>
            <el-table-column prop="stability" label="服务稳定性" sortable></el-table-column>
            <el-table-column prop="meanPod" label="平均容器数" sortable></el-table-column>
            <el-table-column prop="elasticity" label="弹性" sortable>
              <template slot-scope="scope">
                {{ scope.row.elasticity }}%
              </template>
            </el-table-column>
            <el-table-column prop="slaSatisfaction" label="SLA满足度" sortable>
              <template slot-scope="scope">
                {{ scope.row.sla }}%
              </template>
            </el-table-column>
            <el-table-column prop="collector" label="收集者"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="handleToDetail(scope.row.algorithm, scope.row.wave)"
                  type="text"
                  size="small"
                >
                  详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="个人收集数据" name="personal">
        <div class="personal">
          <el-table :data="personList" style="border: solid 2px #DCDFE6;border-radius: 8px;padding: 0 10px" stripe>
            <el-table-column prop="algorithm" label="算法" :filters="algorithms" :filter-method="filterAlgorithm">
            </el-table-column>
            <el-table-column prop="wave" label="流量波形" :filters="waves" :filter-method="filterWave">
            </el-table-column>
            <el-table-column prop="reliability" label="可靠性" sortable>
              <template slot-scope="scope">
                {{ scope.row.reliability }}%
              </template>
            </el-table-column>
            <el-table-column prop="availability" label="可用性" sortable>
              <template slot-scope="scope">
                {{ scope.row.availability }}%
              </template>
            </el-table-column>
            <el-table-column prop="stability" label="服务稳定性" sortable></el-table-column>
            <el-table-column prop="meanPod" label="平均容器数" sortable></el-table-column>
            <el-table-column prop="elasticity" label="弹性" sortable>
              <template slot-scope="scope">
                {{ scope.row.elasticity }}%
              </template>
            </el-table-column>
            <el-table-column prop="slaSatisfaction" label="SLA满足度" sortable>
              <template slot-scope="scope">
                {{ scope.row.slaSatisfaction }}%
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="handleToDetail(scope.row.algorithm, scope.row.wave)"
                  type="text"
                  size="small"
                >
                  详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Label from '@/model/label'
import Metric from '@/model/metric'

export default {
  data() {
    return {
      // ======== 展示数据 Begin ========
      allList: [],
      personList: [],
      algorithms: [],
      waves: [],
      // ======== 展示数据 End ========

      // ======== 控制数据 Begin ========
      activeName: 'all',
      // ======== 控制数据 End ========
    }
  },
  async mounted() {
    // 获取相关数据
    await this.getAlgorithms()
    await this.getWaves()
    await this.getMetrics()
  },
  methods: {
    // ======== 数据函数 Begin ========
    async getAlgorithms() {
      this.algorithms = await Label.getAlgorithmLabels()
      this.algorithms.forEach(a => {
        a.text = a.name
        a.value = a.name
      })
    },
    async getWaves() {
      this.waves = await Label.getWaveLabels()
      this.waves.forEach(w => {
        w.text = w.name
        w.value = w.name
      })
    },
    async getMetrics() {
      const { user } = this.$store.state

      this.allList = await Metric.getAllMetrics()
      this.personList = this.allList.filter(m => m.collector === user.username)
    },
    // ======== 数据函数 End ========

    // ======== 过滤函数 Begin ========
    filterAlgorithm(value, row) {
      return row.algorithm === value
    },
    filterWave(value, row) {
      return row.wave === value
    },
    // ======== 过滤函数 End ========

    // ======== 处理函数 Begin ========
    handleToDetail(algorithm, wave) {
      this.$router.push({ path: '/anlysis/detail', query: { active: this.activeName, algorithm, wave } })
    },
    // ======== 处理函数 End ========
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
  .all {
    display: flex;
    flex: 1;
    width: 100%;
    min-height: 600px;
    .all-title {
      font-size: 25px;
    }
  }
  .personal {
    display: flex;
    flex: 1;
    width: 100%;
    min-height: 600px;
  }
}
</style>
