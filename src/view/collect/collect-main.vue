<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="grid-content collect-list">
          <h2 class="grid-title">收集列表</h2>
          <el-button type="primary">新增</el-button>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180"> </el-table-column>
            <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="8"><div class="grid-content collect-progress"></div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="18"><div class="grid-content collect-status"></div></el-col>
      <el-col :span="6"><div class="grid-content collect-progress"></div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: '',
        author: '',
        summary: '',
        image: '',
      },
      loading: false,
    }
  },
  methods: {},
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
    min-height: 400px;

    .el-table {
      border: 0;
    }
  }
  .collect-progress {
    min-height: 400px;
  }
  .collect-status {
    min-height: 400px;
  }
  .grid-content {
    border-radius: 6px;
    background: white;
    padding: 20px;
  }
  .grid-title {
    font-size: 25px;
  }
}
</style>
