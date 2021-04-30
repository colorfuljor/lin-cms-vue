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
            <el-table-column prop="algorithmType" label="算法" width="270"> </el-table-column>
            <el-table-column prop="waveType" label="流量波形" width="270"> </el-table-column>
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
            :percentage="Math.floor((personNum / totalNum) * 100)"
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
      <el-input class="ip-input" v-model="createInput.addr" placeholder="请输入IP地址" @blur="handleIPBlur"></el-input>
      <div class="el-icon-warning error-tips" v-if="!isIPValid">&ensp;IP地址不合法</div>
      <div style="margin: 10px"></div>
      <el-input
        class="port-input"
        v-model="createInput.port"
        placeholder="请输入端口"
        @blur="handlePortBlur"
      ></el-input>
      <div class="el-icon-warning error-tips" v-if="!isPortValid">&ensp;端口不合法</div>
      <div style="margin: 20px"></div>
      <h2>开始时间</h2>
      <div style="margin: 10px"></div>
      <el-date-picker
        v-model="createInput.startTime"
        type="datetime"
        placeholder="请选择开始时间"
        @blur="handleStartTimeBlur"
      >
      </el-date-picker>
      <div class="el-icon-warning error-tips" v-if="!isStartTimeValid">&ensp;开始时间不允许为空</div>
      <div style="margin: 20px"></div>
      <h2>算法标签</h2>
      <div style="margin: 10px"></div>
      <el-select v-model="createInput.algorithm" placeholder="请选择算法">
        <el-option v-for="item in algorithms" :key="item.value" :label="item.text" :value="item.value"> </el-option>
      </el-select>
      <div class="el-icon-warning error-tips" v-if="!isAlgorithmValid">&ensp;算法标签不允许为空</div>
      <div style="margin: 20px"></div>
      <h2>流量标签</h2>
      <div style="margin: 10px"></div>
      <el-select v-model="createInput.wave" placeholder="请选择流量波形">
        <el-option v-for="item in waves" :key="item.value" :label="item.text" :value="item.value"> </el-option>
      </el-select>
      <div class="el-icon-warning error-tips" v-if="!isWaveValid">&ensp;流量标签不允许为空</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleCreateData">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog class="new-label" title="新增标签" :visible.sync="dialogLabelVisible" v-loading="createLoading">
      <h2>标签名</h2>
      <div style="margin: 10px"></div>
      <el-input
        class="label-name-input"
        v-model="createLabelInput.name"
        placeholder="请输入标签名"
        maxlength="10"
        show-word-limit
        @blur="handleNameBlur"
      >
      </el-input>
      <div class="el-icon-warning error-tips" v-if="!isNameValid">&ensp;标签名不允许为空</div>
      <div style="margin: 20px"></div>
      <h2>描述</h2>
      <div style="margin: 10px"></div>
      <el-input
        class="label-desc-input"
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 8 }"
        placeholder="请输入描述内容"
        v-model="createLabelInput.desc"
        maxlength="30"
        show-word-limit
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

function formatDate(now) {
  const year = now.getFullYear()
  let month = (now.getMonth() + 1).toString()
  let day = now.getDate().toString()
  let hour = now.getHours().toString()
  let minute = now.getMinutes().toString()
  let second = now.getSeconds().toString()
  if (month.length === 1) {
    month = `0${month}`
  }
  if (day.length === 1) {
    day = `0${day}`
  }
  if (hour.length === 1) {
    hour = `0${hour}`
  }
  if (minute.length === 1) {
    minute = `0${minute}`
  }

  if (second.length === 1) {
    second = `0${second}`
  }
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

export default {
  data() {
    return {
      // ======== 展示数据 Begin ========
      roseData: [],
      groupColData: [],
      collectList: [],
      algorithms: [],
      waves: [],
      totalNum: 1,
      personNum: 0,
      // ======== 展示数据 End ========

      // ======== 输入数据 Begin ========
      createInput: {
        addr: '',
        port: '',
        startTime: '',
        algorithm: '',
        wave: '',
      },
      createLabelInput: {
        name: '',
        desc: '',
      },
      // ======== 输入数据 End ========

      // ======== 控制数据 Begin ========
      dialogLabelVisible: false,
      dialogCreateVisible: false,
      isIPValid: true,
      isPortValid: true,
      isStartTimeValid: true,
      isAlgorithmValid: true,
      isWaveValid: true,
      isNameValid: true,
      createLoading: false,
      // ======== 控制数据 End ========
    }
  },
  async mounted() {
    // 获取相关数据
    await this.getLabels()
    await this.getCollectList()

    // 初始化图表，必须在获取数据后
    this.initChart()
  },
  watch: {
    collectList() {
      this.collectList.forEach(collect => {
        const date = new Date(collect.collectTime * 1000)
        collect.collectTime = formatDate(date)
      })
      this.getChartData()
    },
  },
  methods: {
    // ======== 视图函数 Begin ========
    initChart() {
      // 初始化算法扇形图
      new Rose('rose-algorithm', {
        data: this.roseData,
        radiusField: 'value',
        categoryField: 'algorithm',
        colorField: 'algorithm',
        width: 500,
        height: 500,
        label: {
          visible: true,
          type: 'outer',
          content: text => text.algorithm,
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
    getChartData() {
      const { user } = this.$store.state
      const collectNums = {}
      this.totalNum = this.collectList.length
      for (const oneCollect of this.collectList) {
        if (!collectNums.hasOwnProperty(oneCollect.algorithmType)) {
          collectNums[oneCollect.algorithmType] = {}
          collectNums[oneCollect.algorithmType][oneCollect.waveType] = 0
        } else if (!collectNums[oneCollect.algorithmType].hasOwnProperty(oneCollect.waveType)) {
          collectNums[oneCollect.algorithmType][oneCollect.waveType] = 0
        }
        collectNums[oneCollect.algorithmType][oneCollect.waveType]++

        if (oneCollect.collector === user.username) {
          this.personNum++
        }
      }

      for (const algorithm of this.algorithms) {
        let count = 0
        for (const wave of this.waves) {
          let value
          if (
            !collectNums.hasOwnProperty(algorithm.value)
            || !collectNums[algorithm.value].hasOwnProperty(wave.value)
          ) {
            value = 0
          } else {
            value = collectNums[algorithm.value][wave.value]
          }
          this.groupColData.push({
            algorithm: algorithm.text,
            wave: wave.text,
            value,
          })
          count += value
        }
        this.roseData.push({
          algorithm: algorithm.text,
          value: count,
        })
      }
    },
    async getCollectList() {
      this.collectList = await Collect.getCollects()
    },
    // ======== 数据函数 End ========

    // ======== 中间函数 Begin ========
    validateCreateInput() {
      let ret = true
      if (!this.handleIPBlur()) {
        ret = false
      }
      if (!this.handlePortBlur()) {
        ret = false
      }
      if (!this.handleStartTimeBlur()) {
        ret = false
      }
      if (!this.handleAlgorithmBlur()) {
        ret = false
      }
      if (!this.handleWaveBlur()) {
        ret = false
      }
      return ret
    },
    // ======== 中间函数 End ========

    // ======== 处理函数 Begin ========
    async handleCreateData() {
      this.createLoading = true
      if (!this.validateCreateInput()) {
        this.$message.error('输入参数不合法')
      } else {
        await Collect.createCollect(this.createInput)
          .then(res => {
            this.$message.success('新增成功')
            this.dialogCreateVisible = false
            this.createInput = {}
            if (res) {
              this.collectList = res
            }
          })
          .catch(() => {})
      }
      this.createLoading = false
    },
    async handleCreateLabel() {
      this.createLoading = true
      if (!this.handleNameBlur()) {
        this.$message.error('输入参数不合法')
      } else {
        const param = JSON.parse(JSON.stringify(this.createInput))
        param.startTime = Date.parse(param.startTime) / 1000
        const res = Collect.createCollect(param)
        if (res.error !== '') {
          this.$message.error(res.error)
        } else {
          this.$message.success('新增成功')
          this.dialogCreateVisible = false
        }
      }
      this.createLoading = false
    },
    handleIPBlur() {
      this.isIPValid = Validator.validateIP(this.createInput.addr)
      return this.isIPValid
    },
    handlePortBlur() {
      this.isPortValid = Validator.validatePort(this.createInput.port)
      return this.isPortValid
    },
    handleStartTimeBlur() {
      this.isStartTimeValid = this.createInput.startTime !== ''
      return this.isStartTimeValid
    },
    handleAlgorithmBlur() {
      this.isAlgorithmValid = this.createInput.algorithm !== ''
      return this.isAlgorithmValid
    },
    handleWaveBlur() {
      this.isWaveValid = this.createInput.wave !== ''
      return this.isWaveValid
    },
    handleNameBlur() {
      this.isNameValid = this.createLabelInput.name !== ''
      return this.isNameValid
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
  .new-label {
    .el-input {
      margin: 0 10px;
    }
    .el-textarea {
      margin: 0 10px;
    }
    .label-name-input {
      width: 20%;
    }
    .label-desc-input {
      width: 80%;
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
