<template>
  <div class="menu_class">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="rgb(73, 80, 96)"
      text-color="rgba(255,255,255,0.7)"
      unique-opened
      :default-active="active"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <h3 :class="{ coll: !isCollapse }">
        {{ isCollapse ? '后台' : '通用后台管理系统' }}
      </h3>
      <Menus :menuList="menuList"></Menus>
    </el-menu>
  </div>
</template>

<script>
import Menus from './Menus.vue'
import Cookie from 'js-cookie'
// import menudata from './menusList.json'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    Menus,
  },
  data() {
    return {
      // menuList: menudata,
      active: '',
      // isCollapse: false
    }
  },
  mounted() {
    // console.log(menudata)
    console.log(this.$route, '---------')
    if (this.$route.name === 'home') {
      this.active = '/home'
    } else {
      this.$router.push('/home')
      this.active = '/home'
    }
  },
  computed: {
    ...mapState('tab', ['isCollapse', 'menus']),
    menuList() {
      return JSON.parse(Cookie.get('menu')) || [...this.menus]
    },
  },
  watch: {
    $route: {
      handler(val) {
        console.log(val, '路由 ')
        this.active = val.path
      },
    },
    deep: true,
    immediate: true,
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
  },
}
</script>

<style lang="less" scoped>
.menu_class {
  // height: 100vh;
  .el-menu {
    height: 100vh;
    border-right: none;
    h3 {
      text-align: center;
      color: #fff;
      line-height: 48px;
      font-size: 16px;
      font-weight: 400;
    }
    .coll {
      padding: 0 40px;
    }
  }
}
</style>
