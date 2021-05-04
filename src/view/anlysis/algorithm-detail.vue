<template>
  <div class="container">
    <div class="option">
      <el-radio-group
        v-model="activeTag"
        @change="
          comAlgorithm = ''
          comWave = ''
          destoryChart()
        "
      >
        <el-radio-button label="all">全部</el-radio-button>
        <el-radio-button label="personal">个人</el-radio-button>
      </el-radio-group>
      <el-select
        v-model="selectAlgorithm"
        @change="
          comAlgorithm = ''
          comWave = ''
          destoryChart()
        "
        placeholder="请选择算法"
      >
        <el-option v-for="item in algorithms" :key="item.name" :label="item.name" :value="item.name"> </el-option>
      </el-select>
    </div>
    <div class="analysis">
      <div class="data">
        <el-tabs v-model="activeWave" v-if="metrics[selectAlgorithm]">
          <el-tab-pane
            v-for="[wave, metric] of Object.entries(metrics[selectAlgorithm])"
            :label="wave"
            :name="wave"
            :key="wave"
          >
            <el-row :gutter="20">
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <h2>稳定性</h2>
                  <div class="metric-value">{{ metric.reliability }}%</div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <h2>可用性</h2>
                  <div class="metric-value">{{ metric.availability }}%</div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <h2>服务稳定性</h2>
                  <div class="metric-value">{{ metric.stability }}</div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <h2>平均容器数</h2>
                  <div class="metric-value">{{ metric.meanPod }}</div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <h2>弹性</h2>
                  <div class="metric-value">{{ metric.elasticity }}%</div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <h2>SLA满足度</h2>
                  <div class="metric-value">{{ metric.slaSatisfaction }}%</div>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="desc">
        <h2 v-if="selectAlgorithm !== ''">描述</h2>
        <div class="desc-content" v-if="selectAlgorithm !== ''">{{ desc }}</div>
      </div>
    </div>
    <div class="comparison">
      <el-select
        v-model="comAlgorithm"
        @change="
          comWave = ''
          destoryChart()
        "
        placeholder="请选择对比算法"
      >
        <el-option v-for="item in algorithms4com" :key="item.name" :label="item.name" :value="item.name"> </el-option>
      </el-select>
      <el-select v-model="comWave" @change="handleCompare" placeholder="请选择流量" no-data-text="无可对比的流量">
        <el-option v-for="item in wave4com" :key="item" :label="item" :value="item"> </el-option>
      </el-select>
      <el-row :gutter="16">
        <el-col :span="4"><div id="reliability"></div></el-col>
        <el-col :span="4"><div id="availability"></div></el-col>
        <el-col :span="4"><div id="stability"></div></el-col>
        <el-col :span="4"><div id="meanPod"></div></el-col>
        <el-col :span="4"><div id="elasticity"></div></el-col>
        <el-col :span="4"><div id="slaSatisfaction"></div></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { GroupColumn } from '@antv/g2plot'
import Label from '@/model/label'
import Metric from '@/model/metric'

export default {
  data() {
    return {
      // ======== 展示数据 Begin ========
      algorithms: [],
      allMetrics: {},
      personalMetrics: {},
      groupColData: [],
      // ======== 展示数据 End ========

      // ======== 控制数据 Begin ========
      activeTag: 'all',
      selectAlgorithm: 'Static Threshold',
      activeWave: 'Gentle',
      comAlgorithm: '',
      comWave: '',
      desc: '',
      groupCols: [],
      // ======== 控制数据 End ========
    }
  },
  async mounted() {
    // 获取相关数据
    await this.getAlgorithms()
    await this.getMetrics()

    // 获取跳转参数
    this.getQuery()
  },
  computed: {
    algorithms4com() {
      const tmp = this.selectAlgorithm
      return this.algorithms.filter(data => data.name !== tmp)
    },
    wave4com() {
      const tmp = this.metrics[this.comAlgorithm]
      if (tmp && this.metrics[this.selectAlgorithm]) {
        return Object.keys(this.metrics[this.selectAlgorithm]).filter(wave => tmp.hasOwnProperty(wave))
      }
      return []
    },
    metrics() {
      if (this.activeTag === 'all') {
        return this.allMetrics
      }
      if (this.activeTag === 'personal') {
        return this.personalMetrics
      }
      return {}
    },
  },
  methods: {
    // ======== 数据函数 Begin ========
    getQuery() {
      if (this.$route.query.active && this.$route.query.active !== '') {
        this.activeTag = this.$route.query.active
      }
      if (this.$route.query.algorithm && this.$route.query.algorithm !== '') {
        this.selectAlgorithm = this.$route.query.algorithm
      }
      if (this.$route.query.wave && this.$route.query.wave !== '') {
        this.activeWave = this.$route.query.wave
      }
    },
    async getAlgorithms() {
      this.algorithms = await Label.getAlgorithmLabels()
    },
    async getMetrics() {
      const { user } = this.$store.state

      this.allMetrics = await Metric.getMetricMeans()
      this.personalMetrics = await Metric.getPersonalMetricMeans(user.username)
    },
    // ======== 数据函数 End ========

    // ======== 视图函数 Begin ========
    initChart() {
      if (this.groupCols.length) {
        this.destoryChart()
      }
      // 初始化个人收集状态直方图
      for (const oneGroup of this.groupColData) {
        const { metric } = oneGroup[0]
        const groupCol = new GroupColumn(metric, {
          data: oneGroup,
          groupField: 'algorithm',
          xField: metric,
          yField: 'value',
          forceFit: true,
          legend: {
            visible: true,
            position: 'top-right',
          },
          height: 350,
          columnSize: 12,
        })
        groupCol.render()
        this.groupCols.push(groupCol)
      }
    },
    destoryChart() {
      for (const col of this.groupCols) {
        col.destroy()
      }
      this.groupCols = []
    },
    // ======== 视图函数 End ========

    // ======== 处理函数 Begin ========
    handleCompare() {
      // 组装图表数据
      this.groupColData = []
      for (const [metric, value] of Object.entries(this.metrics[this.selectAlgorithm][this.comWave])) {
        const toPush = []
        toPush.push({
          algorithm: this.selectAlgorithm,
          value,
          metric,
        })
        toPush[0][metric] = Metric.metricNameMap[metric]

        toPush.push({
          algorithm: this.comAlgorithm,
          value: this.metrics[this.comAlgorithm][this.comWave][metric],
          metric,
        })
        toPush[1][metric] = Metric.metricNameMap[metric]

        this.groupColData.push(toPush)
      }

      // 初始化图表，必须在获取数据后
      this.initChart()
    },
    // ======== 处理函数 End ========
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
  .option {
    display: flex;
    flex: 1;
    width: 100%;
    height: 60px;
  }
  .analysis {
    display: flex;
    flex: 1;
    width: 100%;
    height: 400px;
    .data {
      width: 70%;
      background-color: white;
      box-shadow: 0px 2px 14px 0px rgba(243, 243, 243, 1);
      border-radius: 8px;
      padding: 20px 10px;
      .el-row {
        padding: 30px 10px;
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
        .el-col {
          border-radius: 4px;
          .bg-purple {
            background: #f4f5f7;
          }
          .grid-content {
            border-radius: 4px;
            margin: 30px 0;
            height: 160px;
            text-align: center;
            h2 {
              color: #606266;
              font-size: 16px;
              position: relative;
              top: 55px;
            }
            .metric-value {
              color: #606266;
              font-size: 25px;
              font-weight: bolder;
              position: relative;
              top: 60px;
            }
          }
        }
      }
    }
    .desc {
      margin-left: 20px;
      background-color: white;
      display: flex;
      flex: 1;
      flex-direction: column;
      box-shadow: 0px 2px 14px 0px rgba(243, 243, 243, 1);
      border-radius: 8px;
      padding: 30px 20px;
      h2 {
        color: #606266;
        font-size: 20px;
      }
      .desc-content {
        margin-top: 10px;
      }
    }
  }
  .comparison {
    margin-top: 20px;
    width: 100%;
    height: 400px;
    box-shadow: 0px 2px 14px 0px rgba(243, 243, 243, 1);
    border-radius: 8px;
    background-color: white;
    .el-select {
      margin: 10px 10px;
    }
  }
}
</style>
