<template>
  <div class="container">
    <div class="option">
      <el-radio-group v-model="activeTag">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="个人"></el-radio-button>
      </el-radio-group>
      <el-select v-model="selectAlgorithm" placeholder="请选择算法">
        <el-option v-for="item in algorithms" :key="item.value" :label="item.text" :value="item.value"> </el-option>
      </el-select>
    </div>
    <div class="analysis">
      <div class="data">
        <el-tabs v-model="activeWave">
          <el-tab-pane
            v-for="metric in metrics[selectAlgorithm]"
            :label="metric.wave"
            :name="metric.wave"
            :key="metric.wave"
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
                  <div class="metric-value">{{ metric.pod }}</div>
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
                  <div class="metric-value">{{ metric.sla }}%</div>
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
      <el-select v-model="comAlgorithm" placeholder="请选择对比算法">
        <el-option v-for="item in algorithms4com" :key="item.value" :label="item.text" :value="item.value"> </el-option>
      </el-select>
      <el-select v-model="comWave" @change="handleCompare" placeholder="请选择流量" no-data-text="请先选择对比算法">
        <el-option v-for="item in wave4com" :key="item.wave" :label="item.wave" :value="item.wave"> </el-option>
      </el-select>
      <el-row :gutter="16">
        <el-col :span="4"><div id="reliability"></div></el-col>
        <el-col :span="4"><div id="availability"></div></el-col>
        <el-col :span="4"><div id="stability"></div></el-col>
        <el-col :span="4"><div id="pod"></div></el-col>
        <el-col :span="4"><div id="elasticity"></div></el-col>
        <el-col :span="4"><div id="sla"></div></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { GroupColumn } from '@antv/g2plot'

export default {
  data() {
    return {
      // 缓存数据
      activeTag: '全部',
      selectAlgorithm: 'Static threshold',
      activeWave: 'Gentle',
      comAlgorithm: '',
      comWave: '',
      desc: '',

      // 源数据
      algorithms: [
        {
          text: 'Static threshold',
          value: 'Static threshold',
          desc: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
        },
        { text: 'Q-learning', value: 'Q-learning', desc: '' },
        { text: 'SARSA', value: 'SARSA', desc: '' },
        { text: 'ARIMA', value: 'ARIMA', desc: '' },
      ],
      metrics: {
        'Static threshold': [
          {
            wave: 'Gentle',
            reliability: 99.55,
            availability: 97.44,
            stability: 0.01514,
            pod: 3.04,
            elasticity: 42.16,
            sla: 93.36,
          },
          {
            wave: 'Rise',
            reliability: 99.55,
            availability: 97.44,
            stability: 0.01514,
            pod: 3.04,
            elasticity: 42.16,
            sla: 93.36,
          },
          {
            wave: 'Decline',
            reliability: 99.55,
            availability: 97.44,
            stability: 0.01514,
            pod: 3.04,
            elasticity: 42.16,
            sla: 93.36,
          },
          {
            wave: 'Burst',
            reliability: 99.55,
            availability: 97.44,
            stability: 0.01514,
            pod: 3.04,
            elasticity: 42.16,
            sla: 93.36,
          },
          {
            wave: 'Diurnal',
            reliability: 99.55,
            availability: 97.44,
            stability: 0.01514,
            pod: 3.04,
            elasticity: 42.16,
            sla: 93.36,
          },
          {
            wave: 'Seasonal',
            reliability: 99.55,
            availability: 97.44,
            stability: 0.01514,
            pod: 3.04,
            elasticity: 42.16,
            sla: 93.36,
          },
        ],
        'Q-learning': [
          {
            wave: 'Gentle',
            reliability: 100.0,
            availability: 100.0,
            stability: 0.02744,
            pod: 3.37,
            elasticity: 12.99,
            sla: 99.78,
          },
          {
            wave: 'Rise',
            reliability: 100.0,
            availability: 100.0,
            stability: 0.02744,
            pod: 3.37,
            elasticity: 12.99,
            sla: 99.78,
          },
          {
            wave: 'Decline',
            reliability: 100.0,
            availability: 100.0,
            stability: 0.02744,
            pod: 3.37,
            elasticity: 12.99,
            sla: 99.78,
          },
          {
            wave: 'Burst',
            reliability: 99.55,
            availability: 97.44,
            stability: 0.01514,
            pod: 3.04,
            elasticity: 42.16,
            sla: 93.36,
          },
          {
            wave: 'Diurnal',
            reliability: 99.55,
            availability: 97.44,
            stability: 0.01514,
            pod: 3.04,
            elasticity: 42.16,
            sla: 93.36,
          },
          {
            wave: 'Seasonal',
            reliability: 99.55,
            availability: 97.44,
            stability: 0.01514,
            pod: 3.04,
            elasticity: 42.16,
            sla: 93.36,
          },
        ],
      },
      groupColData: [
        [
          { algorithm: 'Static threshold', value: 99.55, reliability: '可靠性', metric: 'reliability' },
          { algorithm: 'Q-learning', value: 100.0, reliability: '可靠性', metric: 'reliability' },
        ],
        [
          { algorithm: 'Static threshold', value: 97.44, availability: '可用性', metric: 'availability' },
          { algorithm: 'Q-learning', value: 100.0, availability: '可用性', metric: 'availability' },
        ],
        [
          { algorithm: 'Static threshold', value: 0.01514, stability: '服务稳定性', metric: 'stability' },
          { algorithm: 'Q-learning', value: 0.02744, stability: '服务稳定性', metric: 'stability' },
        ],
        [
          { algorithm: 'Static threshold', value: 3.04, pod: '平均容器数', metric: 'pod' },
          { algorithm: 'Q-learning', value: 3.37, pod: '平均容器数', metric: 'pod' },
        ],
        [
          { algorithm: 'Static threshold', value: 42.16, sla: '弹性', metric: 'sla' },
          { algorithm: 'Q-learning', value: 12.99, sla: '弹性', metric: 'sla' },
        ],
        [
          { algorithm: 'Static threshold', value: 93.36, elasticity: 'SLA满足度', metric: 'elasticity' },
          { algorithm: 'Q-learning', value: 99.78, elasticity: 'SLA满足度', metric: 'elasticity' },
        ],
      ],
    }
  },
  mounted() {},
  computed: {
    algorithms4com() {
      const tmp = this.selectAlgorithm
      return this.algorithms.filter(data => data.text !== tmp)
    },
    wave4com() {
      const tmp = this.metrics[this.comAlgorithm]
      if (tmp) {
        return this.metrics[this.selectAlgorithm].filter(data => {
          for (const item of tmp) {
            if (item.wave === data.wave) {
              return true
            }
          }
          return false
        })
      }
      return []
    },
  },
  methods: {
    handleCompare() {
      // 初始化图表，必须在获取数据后
      this.initChart()
    },
    initChart() {
      // 初始化个人收集状态直方图
      for (const oneGroup of this.groupColData) {
        const { metric } = oneGroup[0]
        console.log(metric)
        new GroupColumn(metric, {
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
        }).render()
      }
    },
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
