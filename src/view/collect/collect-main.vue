<template>
  <div style="height:100%;">
    <el-container>
      <el-aside :width="sideBarWidth" class="aside" :style="asideStyle">
        <side-bar :isCollapse="isCollapse" :is-phone="isPhone"></side-bar>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div class="left">
            <div class="operate" ref="operate">
              <i class="iconfont icon-fold" :class="{ rotate: foldState }" @click="changeSlidebarState" />
              <nav-bar></nav-bar>
            </div>
            <el-collapse-transition> <reuse-tab ref="reuse"></reuse-tab> </el-collapse-transition>
          </div>
        </el-header>
        <el-main ref="main">
          <menu-tab></menu-tab>
          <app-main ref="appMain"></app-main>
        </el-main>
        <back-top :right="50" :bottom="50" :fontSize="34"></back-top>
      </el-container>
      <div class="sidenav-mask" :class="{ show: isPhone && isCollapse }" @click="changeSlidebarState"></div>
    </el-container>
  </div>
</template>

<script>
import book from '@/model/book'

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
  methods: {
    async submitForm(formName) {
      try {
        this.loading = true
        const res = await book.createBook(this.form)
        this.loading = false
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.$message.success(`${res.message}`)
          this.resetForm(formName)
        }
      } catch (error) {
        this.loading = false
        this.$message.error('图书添加失败，请检测填写信息')
        console.log(error)
      }
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;
    border-bottom: 1px solid #dae1ec;
  }

  .wrap {
    padding: 20px;
  }

  .submit {
    float: left;
  }
}
</style>
