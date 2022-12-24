<template>
  <div class="header-container">
    <div class="l-content">
      <el-button
        @click="handleMenu"
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <span class="text">首页</span>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="avatar" src="../assets/logo.png" alt="" />
          <!-- 下拉菜单<i class="el-icon-arrow-down el-icon--right"></i> -->
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: '',
  components: {},
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {
    ...mapMutations('tab', ['setIsCollapse']),
    handleMenu() {
      this.setIsCollapse()
    },
  },
}
</script>

<style lang="less" scoped>
.header-container {
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .text {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }
  .avatar {
    height: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #fff;
  }
}
</style>
