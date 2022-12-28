<template>
  <div class="login">
    <el-form
      ref="form"
      :inline="true"
      :model="form"
      :rules="rules"
      label-width="70px"
    >
      <h3 class="login-title">系统登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="form.password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          style="margin-left: 105px; margin-top: 10px"
          type="primary"
          @click="submit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import { getMenu } from '../api/index'
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  components: {},
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ require: true, trigger: 'blur', message: '请输入用户名' }],
        password: [{ require: true, trigger: 'blur', message: '请输入密码' }],
      },
    }
  },
  computed: {},
  created() {},
  methods: {
    ...mapMutations('tab', ['setMenu', 'addMenu']),
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const { data } = await getMenu(this.form)
          if (data.code === 20000) {
            Cookie.set('token', data.data.token)
            // 设置menus
            this.setMenu(data.data.menu)
            this.addMenu(this.$router)
            this.$router.push({ name: 'home' })
          } else {
            this.$message.error(data.data.message)
          }
          // alert('submit!')
          // token 生成随机数
          // const token = Mock.Random.guid()
          // 将token信息存入cookie 用于不同页面间的通信
          // Cookie.set('token', token)

          // this.$router.push({ name: 'home' })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.login {
  width: 350px;
  margin: 100px auto;
  border: 1px solid #ddd;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;
  &-title {
    text-align: center;
    margin-bottom: 40px;
    color: #505458;
  }
  .el-input {
    width: 198px;
  }
}
</style>
