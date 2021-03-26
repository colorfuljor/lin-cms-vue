<template>
  <div class="container">
    <el-row :gutter="16">
      <el-col :span="16">
        <div class="grid-content collect-list">
          <h2 class="grid-title">收集列表</h2>
          <div>
            <el-button type="primary" style="margin: 30px 0 10px 5px" @click="handleAddCollect">新增</el-button>
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
    <el-dialog title="新增数据" :visible.sync="dialogCreateVisible"> </el-dialog>
  </div>
</template>

<script>
import { Rose, GroupColumn } from '@antv/g2plot'

export default {
  data() {
    return {
      roseData: [
        {
          type: '服装',
          value: 2700,
        },
        {
          type: '游戏',
          value: 2500,
        },
        {
          type: '数码',
          value: 1898,
        },
        {
          type: '食品',
          value: 2376,
        },
        {
          type: '书籍',
          value: 1760,
        },
        {
          type: '其他',
          value: 1500,
        },
      ],
      groupColData: [
        { month: '1月', area: '东区', value: 1200 },
        { month: '1月', area: '南区', value: 800 },
        { month: '1月', area: '北区', value: 900 },
        { month: '2月', area: '东区', value: 800 },
        { month: '2月', area: '南区', value: 1000 },
        { month: '2月', area: '北区', value: 1100 },
        { month: '3月', area: '东区', value: 600 },
        { month: '3月', area: '南区', value: 988 },
        { month: '3月', area: '北区', value: 866 },
        { month: '4月', area: '东区', value: 1140 },
        { month: '4月', area: '南区', value: 900 },
        { month: '4月', area: '北区', value: 870 },
        { month: '5月', area: '东区', value: 880 },
        { month: '5月', area: '南区', value: 780 },
        { month: '5月', area: '北区', value: 1168 },
        { month: '6月', area: '东区', value: 800 },
        { month: '6月', area: '南区', value: 840 },
        { month: '6月', area: '北区', value: 850 },
        { month: '7月', area: '东区', value: 900 },
        { month: '7月', area: '南区', value: 890 },
        { month: '7月', area: '北区', value: 1000 },
      ],
      collectList: [
        {
          algorithm: 'static-scale',
          wave: 'burst',
          collector: 'colorful',
          collectTime: '2021-05-02',
        },
        {
          algorithm: 'static-scale',
          wave: 'burst',
          collector: 'colorful',
          collectTime: '2021-05-02',
        },
        {
          algorithm: 'static-scale',
          wave: 'burst',
          collector: 'colorful',
          collectTime: '2021-05-02',
        },
        {
          algorithm: 'static-scale',
          wave: 'burst',
          collector: 'colorful',
          collectTime: '2021-05-02',
        },
        {
          algorithm: 'static-scale',
          wave: 'burst',
          collector: 'colorful',
          collectTime: '2021-05-02',
        },
        {
          algorithm: 'static-scale',
          wave: 'burst',
          collector: 'colorful',
          collectTime: '2021-05-02',
        },
        {
          algorithm: 'static-scale',
          wave: 'burst',
          collector: 'colorful',
          collectTime: '2021-05-02',
        },
        {
          algorithm: 'static-scale',
          wave: 'burst',
          collector: 'colorful',
          collectTime: '2021-05-02',
        },
        {
          algorithm: 'static-scale',
          wave: 'burst',
          collector: 'colorful',
          collectTime: '2021-05-02',
        },
      ],
      dialogCreateVisible: false,
      totalNum: 100,
      personNum: 10,
      loading: false,
    }
  },
  mounted() {
    // 初始化图表，必须在获取数据后
    this.initChart()
  },
  methods: {
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
        groupField: 'area',
        xField: 'month',
        yField: 'value',
        meta: {
          month: {
            alias: '月份',
          },
          value: {
            alias: '数量',
          },
        },
        forceFit: true,
        color: ['#4577FF', '#00C292', '#FEC108'],
        columnSize: 12,
        legend: {
          visible: true,
          position: 'top-right',
        },
      }).render()
    },
    handleAddCollect() {
      this.dialogCreateVisible = true
    },
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
    min-height: 580px;

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
      padding: 0 180px;
      .personal-influence-item {
        display: flex;
        flex-direction: column;
        align-items: center;
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
