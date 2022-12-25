<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <Tag></Tag>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from '@/components/Aside.vue'
import Header from '@/components/CommonHeader.vue'
import Tag from '@/components/CommonTag.vue'
export default {
  name: 'Home',
  components: { Aside, Header, Tag },
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {},
}
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
}
.el-main {
  // border: 1px solid red;
  height: calc(100vh - 125px);
  overflow: auto;
  // background-color: pink;
}
</style>
