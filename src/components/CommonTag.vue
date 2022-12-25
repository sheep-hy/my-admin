<template>
  <div class="tags">
    <el-tag
      v-for="(item, index) in tags"
      :key="item.label"
      effect="dark"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item, index)"
      size="small"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'CommonTag',
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapState('tab', ['tabList']),
    tags() {
      return this.tabList || []
    },
  },
  created() {
    // console.log(this.$route, '$route')
  },
  methods: {
    ...mapMutations('tab', ['closeTag']),
    // 点击tag 路由跳转
    changeMenu(item) {
      this.$router.push({ name: item.name })
    },
    // 点击tag 删除页签
    handleClose(item, index) {
      this.closeTag(item)
      // 这时候 this.tags是最新的数据
      const length = this.tags.length
      // 当前路由和删除的不一致 不需要操作 一致时 页面需要跳转到前一个tag
      if (item.name !== this.$route.name) {
        return
      }
      // 表示删除最后一项
      if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name,
        })
      } else {
        this.$router.push({
          name: this.tags[index].name,
        })
      }
      // 删除中间的 需要向后跳转
    },
  },
}
</script>

<style lang="less" scoped>
.tags {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
