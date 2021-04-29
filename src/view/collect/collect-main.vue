<template>
  <div class="container">
    <el-row :gutter="16">
      <el-col :span="16">
        <div class="grid-content collect-list">
          <h2 class="grid-title">收集列表</h2>
          <div>
            <el-button type="primary" style="margin: 30px 0 10px 5px" @click="dialogCreateVisible = true"
              >新增</el-button
            >
            <el-button type="primary" style="margin: 30px 0 10px 5px" @click="dialogLabelVisible = true"
              >新增标签</el-button
            >
          </div>
          <el-table
            :data="collectList"
            style="border: solid 2px #DCDFE6;border-radius: 8px;padding: 0 10px"
            stripe
            max-height="480px"
          >
            <el-table-column type="index" width="60" align="center"></el-table-column>
            <el-table-column prop="algorithm" label="算法" width="270"> </el-table-column>
            <el-table-column prop="wave" label="流量波形" width="270"> </el-table-column>
            <el-table-column prop="collector" label="收集者" width="270"> </el-table-column>
            <el-table-column prop="collectTime" label="收集时间"> </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content collect-progress">
          <h2 class="grid-title">算法扇形图</h2>
          <div id="rose-algorithm"></div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="18">
        <div class="grid-content collect-status">
          <h2 class="grid-title">个人收集状态</h2>
          <div id="grouped-column"></div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content collect-influence">
          <h2 class="grid-title">个人贡献率</h2>
          <el-progress
            type="circle"
            :percentage="(personNum / totalNum) * 100"
            color="#8e71c7"
            :width="250"
          ></el-progress>
          <div class="personal-influence">
            <div class="personal-influence-item">
              <div class="personal-influence-num color1">{{ personNum }}</div>
              <div class="personal-influece-label">个人收集量</div>
            </div>
            <div class="personal-influence-item">
              <div class="personal-influence-num color2">{{ totalNum }}</div>
              <div class="personal-influece-label">总量</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog class="new-data" title="新增数据" :visible.sync="dialogCreateVisible" v-loading="createLoading">
      <h2>Prometheus</h2>
      <div style="margin: 10px"></div>
      <el-input class="ip-input" v-model="create_input.addr" placeholder="请输入IP地址" @blur="handleIPBlur"></el-input>
      <div class="el-icon-warning error-tips" v-if="!isIPValid">IP地址不合法</div>
      <div style="margin: 10px"></div>
      <el-input
        class="port-input"
        v-model="create_input.port"
        placeholder="请输入端口"
        @blur="handlePortBlur"
      ></el-input>
      <div class="el-icon-warning error-tips" v-if="!isPortValid">端口不合法</div>
      <div style="margin: 20px"></div>
      <h2>开始时间</h2>
      <div style="margin: 10px"></div>
      <el-date-picker v-model="create_input.startTime" type="datetime" placeholder="请选择开始时间"> </el-date-picker>
      <div style="margin: 20px"></div>
      <h2>算法标签</h2>
      <div style="margin: 10px"></div>
      <el-select v-model="create_input.algorithm" placeholder="请选择算法">
        <el-option v-for="item in algorithms" :key="item.value" :label="item.text" :value="item.value"> </el-option>
      </el-select>
      <div style="margin: 20px"></div>
      <h2>流量标签</h2>
      <div style="margin: 10px"></div>
      <el-select v-model="create_input.wave" placeholder="请选择流量波形">
        <el-option v-for="item in waves" :key="item.value" :label="item.text" :value="item.value"> </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleCreateData">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新增标签" :visible.sync="dialogLabelVisible">
      <h2>标签名</h2>
      <el-input
        v-model="create_label_input.name"
        placeholder="请输入标签名"
        style="width: 20%;
    margin: 10px;"
        maxlength="10"
        show-word-limit
      ></el-input>
      <h2>描述</h2>
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        placeholder="请输入描述内容"
        v-model="create_label_input.desc"
        maxlength="30"
        show-word-limit
        style="margin: 10px;width: 80%"
      >
      </el-input>
      <div style="margin: 10px"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleCreateLabel">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Rose, GroupColumn } from '@antv/g2plot'
import Label from '@/model/label'
import Collect from '@/model/collect'
import Validator from '@/utils/validator'

export default {
  data() {
    return {
      // ======== 展示数据 Begin ========
      roseData: [
        {
          type: 'Static threshold',
          value: 1,
        },
        {
          type: 'Q-learning',
          value: 1,
        },
        {
          type: 'SARSA',
          value: 0,
        },
        {
          type: 'ARIMA',
          value: 0,
        },
      ],
      groupColData: [
        { algorithm: 'Static threshold', wave: 'Gentle', value: 1 },
        { algorithm: 'Static threshold', wave: 'Rise', value: 0 },
        { algorithm: 'Static threshold', wave: 'Decline', value: 0 },
        { algorithm: 'Static threshold', wave: 'Burst', value: 0 },
        { algorithm: 'Static threshold', wave: 'Diurnal', value: 0 },
        { algorithm: 'Static threshold', wave: 'Seasonal', value: 0 },

        { algorithm: 'Q-learning', wave: 'Gentle', value: 1 },
        { algorithm: 'Q-learning', wave: 'Rise', value: 0 },
        { algorithm: 'Q-learning', wave: 'Decline', value: 0 },
        { algorithm: 'Q-learning', wave: 'Burst', value: 0 },
        { algorithm: 'Q-learning', wave: 'Diurnal', value: 0 },
        { algorithm: 'Q-learning', wave: 'Seasonal', value: 0 },

        { algorithm: 'SARSA', wave: 'Gentle', value: 0 },
        { algorithm: 'SARSA', wave: 'Rise', value: 0 },
        { algorithm: 'SARSA', wave: 'Decline', value: 0 },
        { algorithm: 'SARSA', wave: 'Burst', value: 0 },
        { algorithm: 'SARSA', wave: 'Diurnal', value: 0 },
        { algorithm: 'SARSA', wave: 'Seasonal', value: 0 },

        { algorithm: 'ARIMA', wave: 'Gentle', value: 0 },
        { algorithm: 'ARIMA', wave: 'Rise', value: 0 },
        { algorithm: 'ARIMA', wave: 'Decline', value: 0 },
        { algorithm: 'ARIMA', wave: 'Burst', value: 0 },
        { algorithm: 'ARIMA', wave: 'Diurnal', value: 0 },
        { algorithm: 'ARIMA', wave: 'Seasonal', value: 0 },
      ],
      collectList: [],
      algorithms: [],
      waves: [],
      totalNum: 2,
      personNum: 2,
      // ======== 展示数据 End ========

      // ======== 输入数据 Begin ========
      create_input: {
        addr: '',
        port: '',
        startTime: '',
        algorithm: '',
        wave: '',
      },
      create_label_input: {
        name: '',
        desc: '',
      },
      // ======== 输入数据 End ========

      // ======== 控制数据 Begin ========
      dialogLabelVisible: false,
      dialogCreateVisible: false,
      isIPValid: true,
      isPortValid: true,
      createLoading: false,
      // ======== 控制数据 End ========
    }
  },
  mounted() {
    // 获取相关数据
    this.getLabels()
    this.getCollectList()

    // 初始化图表，必须在获取数据后
    this.initChart()
  },
  methods: {
    // ======== 视图函数 Begin ========
    initChart() {
      // 初始化算法扇形图
      new Rose('rose-algorithm', {
        data: this.roseData,
        radiusField: 'value',
        categoryField: 'type',
        colorField: 'type',
        width: 500,
        height: 500,
        label: {
          visible: true,
          type: 'outer',
          content: text => text.type,
        },
      }).render()

      // 初始化个人收集状态直方图
      new GroupColumn('grouped-column', {
        data: this.groupColData,
        groupField: 'wave',
        xField: 'algorithm',
        yField: 'value',
        meta: {
          algorithm: {
            alias: '算法',
          },
          value: {
            alias: '数量',
          },
        },
        height: 360,
        forceFit: true,
        columnSize: 12,
        legend: {
          visible: true,
          position: 'top-right',
        },
      }).render()
    },
    // ======== 视图函数 End ========

    // ======== 数据函数 Begin ========
    async getLabels() {
      this.algorithms = await Label.getAlgorithmLabels()
      this.waves = await Label.getWaveLabels()
    },
    async getCollectList() {
      this.collectList = await Collect.getCollects()
    },
    // ======== 数据函数 End ========

    // ======== 中间函数 Begin ========
    // ======== 中间函数 End ========

    // ======== 处理函数 Begin ========
    async handleCreateData() {
      this.createLoading = true
      if (!this.isIPValid || !this.isPortValid) {
        this.$message.error('输入参数不合法')
      } else {
        const res = { error: '' }
        if (res.error !== '') {
          this.$message.error(res.error)
        } else {
          this.$message.success('新增成功')
          this.dialogCreateVisible = false
        }
      }
      this.createLoading = false
    },
    async handleCreateLabel() {
      this.createLoading = true
      this.createLoading = false
    },
    handleIPBlur() {
      this.isIPValid = Validator.validateIP(this.create_input.addr)
    },
    handlePortBlur() {
      this.isPortValid = Validator.validatePort(this.create_input.port)
    },
    // ======== 处理函数 End ========
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
  .el-row {
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .collect-list {
    height: 580px;

    .el-table {
      border: 0;
    }
  }
  .collect-progress {
    min-height: 580px;
    #rose-algorithm {
      text-align: center;
    }
  }
  .collect-status {
    min-height: 400px;
    padding-bottom: 0 !important;
    #grouped-column {
      margin-top: 25px;
    }
  }
  .collect-influence {
    min-height: 400px;
    .el-progress {
      color: #8e71c7;
      margin: 40px 0 20px -125px;
      left: 50%;
    }
    .personal-influence {
      display: flex;
      justify-content: space-between;
      .personal-influence-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: auto;
        .personal-influence-num {
          font-size: 28px;
          line-height: 34px;
          &.color1 {
            color: #00c292;
          }
          &.color2 {
            color: #fec108;
          }
          &.color3 {
            color: #03a9f3;
          }
        }
        .personal-influece-label {
          font-size: 12px;
          font-weight: 400;
          color: #8c98ae;
          line-height: 17px;
        }
      }
    }
  }
  .grid-content {
    border-radius: 6px;
    background: white;
    padding: 20px;
  }
  .grid-title {
    font-size: 25px;
  }
  .new-data {
    .el-input {
      margin: 0 10px;
    }
    .el-select {
      margin: 0 10px;
    }
    .ip-input {
      width: 30%;
    }
    .port-input {
      width: 20%;
    }
    .error-tips {
      color: #f56c6c;
    }
  }

  ::-webkit-scrollbar-track-piece {
    background: #e4e4e4;
  }

  ::-webkit-scrollbar-track {
    display: none;
  }

  ::-webkit-scrollbar-thumb {
    background: dimgrey;
    border-radius: 8px;
    opacity: 0.7;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #634343;
    border-radius: 8px;
  }

  ::-webkit-scrollbar-corner {
    background: #e4e4e4;
  }

  ::-webkit-scrollbar-button {
    display: none;
  }

  .htComments ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar {
    width: 8px;
    background: rgba(238, 238, 238, 0.2);
  }
}
</style>
