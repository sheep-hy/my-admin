<template>
  <div>
    <template v-for="list in this.menuList">
      <el-submenu
        v-if="list.children?.length > 0"
        :index="list.path"
        :key="list.name"
      >
        <template slot="title">
          <i v-if="list.icon" class="el-icon-menu"></i>
          <span slot="title">{{ list.label }}</span>
        </template>
        <!-- 当有子集数据使用自调用，:menuList通过props传递  -->
        <Menus :menuList="list.children"></Menus>
      </el-submenu>
      <el-menu-item
        v-else
        :index="list.path"
        :key="list.label"
        @click="clickMenu(list)"
      >
        <i v-if="list.icon" class="el-icon-menu"></i>
        <span>{{ list.label }}</span>
      </el-menu-item>
    </template>
  </div>
</template>
<script>
export default {
  name: 'Menus', //递归组件的关键，并且要与引入组件的变量名称一致
  data() {
    return {}
  },
  props: ['menuList'],
  created() {
  },
  methods: {
    clickMenu(item) {
      if (
        this.$route.path !== item.path &&
        !(this.$route.path === '/home' && item.path === '/')
      )
        this.$router.push(item.path)
    },
  },
}
</script>
<style>
.el-menu--collapse span,
.el-menu--collapse i.el-submenu__icon-arrow {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
</style>
