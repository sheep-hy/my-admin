<template>
  <div class="user">
    <el-dialog
      :title="modalType === 0 ? '新增用户' : '编辑用户'"
      :before-close="handleClose"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <el-form
        ref="form"
        :inline="true"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-DD"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>

        <!-- <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button>取消</el-button>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button @click="handleAdd" type="primary">+ 新增</el-button>
      <!-- // 搜索 -->
      <el-form :inline="true" :model="formSearch">
        <el-form-item prop="name">
          <el-input
            placeholder="请输入姓名"
            v-model="formSearch.name"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" height="90%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="{ row }">
            <span style="margin-left: 10px">{{
              row.sex === 1 ? '男' : '女'
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column prop="action" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
const formList = [
  { model: 'name', label: '姓名', type: 'input' },
  { model: 'age', label: '年龄', type: 'input' },
  {
    model: 'sex',
    label: '性别',
    type: 'select',
    opts: [
      { label: '男', value: 1 },
      { label: '女', value: 0 },
    ],
  },
  { model: 'birth', label: '出生日期', type: 'date' },
  { model: 'addr', label: '地址', type: 'input' },
]
import { getUser, addUser, editUser, delUser } from '../api/index'
export default {
  name: 'User',
  components: {},
  data() {
    return {
      dialogVisible: false,
      form: {
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: '',
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        birth: [{ required: true, message: '请选择出生年月', trigger: 'blur' }],
        addr: [{ required: true, message: '请输入地址', trigger: 'blur' }],
      },
      tableData: [],
      modalType: 0,
      page: 1,
      limit: 20,
      total: 0,
      formSearch: {
        name: '',
      },
    }
  },
  computed: {},
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getUser({
        params: { ...this.formSearch, page: this.page, limit: this.limit },
      }).then(({ data }) => {
        console.log(data, '--user')
        this.tableData = data.list
        this.total = data.count || 0
      })
    },
    // 新增
    handleAdd() {
      this.dialogVisible = true
      this.modalType = 0
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return
        }
        if (this.modalType === 0) {
          //新增
          addUser(this.form).then(() => {
            // 成功
            this.getList()
          })
        } else {
          //编辑
          editUser(this.form).then(() => {
            // 成功
            this.getList()
          })
        }
        // console.log(this.form, '表单数据')
        this.$refs.form.resetFields()
        this.dialogVisible = false
      })
    },
    cancel() {
      this.handleClose()
    },
    handleClose() {
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    handleEdit(index, row) {
      this.dialogVisible = true
      this.modalType = 1
      Object.assign(this.form, row)
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该用户信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          delUser({ id: row.id }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    handleSizeChange(val) {
      this.limit = val
      this.getList()
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.page = val
      this.getList()
      // console.log(`当前页: ${val}`)
    },
    // 列表查询
    onSearch() {
      this.getList()
    },
  },
}
</script>

<style lang="less" scoped>
.user {
  height: 100%;
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .table {
    position: relative;
    height: calc(100% - 52px);
    .page {
      position: absolute;
      right: 20px;
      bottom: 0;
    }
  }
}
</style>
