<template>
  <div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="addMenu">新增机构</el-button>
      </div>
      <el-table :data="tableData" row-key="ID">
        <el-table-column align="center" label="机构ID" width="80" prop="ID" />
        <el-table-column align="left" label="机构名称" show-overflow-tooltip min-width="160" prop="name" />
        <el-table-column align="left" label="机构地址" show-overflow-tooltip min-width="160" prop="address" />
        <el-table-column align="center" label="机构负责人" min-width="100" prop="principal" />
        <el-table-column align="center" label="机构负责人电话" min-width="160" prop="principalMobile" />
        <el-table-column align="center" label="机构类型" width="100" prop="type" />
        <el-table-column align="left" label="机构LOGO" prop="logo" />
        <el-table-column align="center" label="操作" min-width="120">
          <template #default="{ row }">
            <el-button icon="el-icon-edit" type="text" size="small" @click="editorOpen(row)">编辑</el-button>
            <el-button
              icon="el-icon-delete"
              size="small"
              type="text"
              @click="deleteItem(row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="dialogFormVisible" :before-close="handleClose" :title="dialogTitle">
      <el-form
        v-if="dialogFormVisible"
        ref="menuForm"
        :inline="true"
        :model="form"
        :rules="rules"
        label-width="110px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构名称" prop="name" style="width: 100%;">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="机构地址" prop="address" style="width: 100%;">
              <el-input v-model="form.address" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构负责人" prop="principal">
              <el-input v-model="form.principal" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构负责人电话" prop="principalMobile">
              <el-input v-model="form.principalMobile" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构类型" prop="type">
              <el-input v-model="form.type" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="机构LOGO" prop="logo" style="width: 100%;">
              <el-input v-model="form.logo" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="small" @click="closeDialog">取 消</el-button>
          <el-button size="small" type="primary" @click="enterDialog">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
// 获取列表内容封装在mixins内部  getTableData方法 初始化已封装完成

import {
  getSchoolList,
  createSchool,
  updateSchool,
  deleteSchool
} from '@/api/school'
import infoList from '@/mixins/infoList'
export default {
  name: 'SchoolList',
  mixins: [infoList],
  data() {
    return {
      checkFlag: false,
      listApi: getSchoolList,
      dialogFormVisible: false,
      dialogTitle: '',
      form: {
        ID: 0,
        name: '',
        address: '',
        principal: '',
        principalMobile: '',
        type: '',
        logo: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入机构名称!', trigger: 'blur' }
        ]
      },
      isEdit: false
    }
  },
  async created() {
    this.pageSize = 999
    console.log('aa')
    await this.getTableData()
  },
  methods: {
    handleClose(done) {
      this.initForm()
      done()
    },
    // 初始化弹窗内表格方法
    initForm() {
      this.checkFlag = false
      this.$refs.menuForm.resetFields()
      this.form = {
        ID: 0,
        name: '',
        address: '',
        principal: '',
        principalMobile: '',
        type: '',
        logo: ''
      }
    },
    // 关闭弹窗
    closeDialog() {
      this.initForm()
      this.dialogFormVisible = false
    },
    // 添加menu
    async enterDialog() {
      this.$refs.menuForm.validate(async valid => {
        if (valid) {
          let res
          if (this.isEdit) {
            res = await updateSchool(this.form)
          } else {
            res = await createSchool(this.form)
          }
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: res.msg
            })
            await this.getTableData()
          }
          this.initForm()
          this.dialogFormVisible = false
        }
      })
    },
    // 添加菜单方法，id为 0则为添加根菜单
    addMenu() {
      this.dialogTitle = '新增机构'
      this.isEdit = false
      this.dialogFormVisible = true
    },
    editorOpen(row) {
      for (const key in this.form) {
        this.form[key] = row[key]
      }
      this.dialogTitle = '编辑机构'
      this.isEdit = true
      this.dialogFormVisible = true
    },
    async deleteItem(row) {
      this.$confirm('此操作将删除该机构, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const sendData = {
            ID: row.ID
          }
          const res = await deleteSchool(sendData)
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: res.msg
            })
            if (this.tableData.length === 1 && this.page > 1) {
              this.page--
            }
            await this.getTableData()
          }
        })
    },
  }
}
</script>

<style scoped lang="scss">
</style>
