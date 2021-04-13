<template>
  <div class="container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="所有收集数据" name="1">
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
            <el-table-column prop="pod" label="平均容器数" sortable></el-table-column>
            <el-table-column prop="elasticity" label="弹性" sortable>
              <template slot-scope="scope">
                {{ scope.row.elasticity }}%
              </template>
            </el-table-column>
            <el-table-column prop="sla" label="SLA满足度" sortable>
              <template slot-scope="scope">
                {{ scope.row.sla }}%
              </template>
            </el-table-column>
            <el-table-column prop="collector" label="收集者"></el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button @click.native.prevent="handleToDetail" type="text" size="small">
                  详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="个人收集数据" name="2">
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
            <el-table-column prop="pod" label="平均容器数" sortable></el-table-column>
            <el-table-column prop="elasticity" label="弹性" sortable>
              <template slot-scope="scope">
                {{ scope.row.elasticity }}%
              </template>
            </el-table-column>
            <el-table-column prop="sla" label="SLA满足度" sortable>
              <template slot-scope="scope">
                {{ scope.row.sla }}%
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button @click.native.prevent="handleToDetail" type="text" size="small">
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
export default {
  data() {
    return {
      activeName: '1',
      allList: [
        {
          algorithm: 'Q-learning',
          wave: 'Gentle',
          collector: 'test',
          reliability: 100.0,
          availability: 100.0,
          stability: 0.02744,
          pod: 3.37,
          elasticity: 12.99,
          sla: 99.78,
        },
        {
          algorithm: 'Static threshold',
          wave: 'Gentle',
          collector: 'test',
          reliability: 99.55,
          availability: 97.44,
          stability: 0.01514,
          pod: 3.04,
          elasticity: 42.16,
          sla: 93.36,
        },
      ],
      personList: [
        {
          algorithm: 'Q-learning',
          wave: 'Gentle',
          collector: 'test',
          reliability: 100.0,
          availability: 100.0,
          stability: 0.02744,
          pod: 3.37,
          elasticity: 12.99,
          sla: 99.78,
        },
        {
          algorithm: 'Static threshold',
          wave: 'Gentle',
          collector: 'test',
          reliability: 99.55,
          availability: 97.44,
          stability: 0.01514,
          pod: 3.04,
          elasticity: 42.16,
          sla: 93.36,
        },
      ],
      algorithms: [
        { text: 'Static threshold', value: 'Static threshold' },
        { text: 'Q-learning', value: 'Q-learning' },
        { text: 'SARSA', value: 'SARSA' },
        { text: 'ARIMA', value: 'ARIMA' },
      ],
      waves: [
        { text: 'Gentle', value: 'Gentle' },
        { text: 'Rise', value: 'Rise' },
        { text: 'Decline', value: 'Decline' },
        { text: 'Burst', value: 'Burst' },
        { text: 'Diurnal', value: 'Diurnal' },
        { text: 'Seasonal', value: 'Seasonal' },
      ],
    }
  },
  methods: {
    filterAlgorithm(value, row) {
      return row.algorithm === value
    },
    filterWave(value, row) {
      return row.wave === value
    },
    handleToDetail() {
      this.$router.push('/anlysis/detail')
    },
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
