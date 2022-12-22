<template>
  <div class="menu_class">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="rgb(73, 80, 96)"
      text-color="rgba(255,255,255,0.7)"
      unique-opened
      :default-active="active"
    >
      <h3>通用后台管理系统</h3>
      <Menus :menuList="menuList"></Menus>
    </el-menu>
  </div>
</template>

<script>
import Menus from './Menus.vue'
import menudata from './menusList.json'
export default {
  components: {
    Menus,
  },
  data() {
    return {
      menuList: menudata,
      active: '',
    }
  },
  created() {
    // console.log(menudata)
    // console.log(this.$route, '---------')
    if (this.$route.path === '/home') {
      this.active = '/'
    } else {
      this.active = this.$route.path
    }
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.menu_class {
  height: 100vh;
  .el-menu {
    height: 100vh;
    border-right:none;
    h3 {
      text-align: center;
      color: #fff;
      line-height: 48px;
    }
  }
}
</style>
