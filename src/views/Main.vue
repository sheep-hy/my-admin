<template>
  <div class="">
    <el-container>
      <el-aside width="300px" height="500px">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
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
export default {
  name: 'Home',
  components: {Aside,Header},
  data() {
    return {}
  },
  computed: {},
  created() {

  },
  methods: {},
}
</script>

<style lang="less" scoped>
.el-header{
  padding: 0;
}

</style>
