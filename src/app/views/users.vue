<template>
  <div class="quick-container">
    <el-card class="quick-card">
      <div slot="header">
        <span>用户列表</span>
        <el-button size="mini" class="add-user__button" type="primary" @click="openAddUserDialog()">用户添加</el-button>
      </div>
      <div class="card-text">
        <el-table :data="users" style="width: 100%" height="500" border stripe>
          <el-table-column fixed="left" type="index" width="50">
          </el-table-column>

          <el-table-column fixed prop="id" label="用户表的ID" width="80">
          </el-table-column>

          <el-table-column prop="userShowName" label="用户显示名" width="200" sortable>
          </el-table-column>

          <el-table-column label="用户登录名" width="200" sortable>
            <template slot-scope="scope">
              <el-tag size="medium"> {{scope.row.userName}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="userDesc" label="描述" sortable>
          </el-table-column>
          <el-table-column label="创建时间" width="200" sortable>
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              {{scope.row.gmtCreate}}
            </template>
          </el-table-column>

          <el-table-column label="修改时间" width="200" sortable>
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              {{scope.row.gmtModified}}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="editUser(scope.row)" size="small">编辑
              </el-button>
              <el-button type="text" @click="deleteUser(scope.row)" size="small">移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-dialog :title="dialogName" :visible.sync="diaLoginVisible" width="30%" center>
      <el-form :model="dialogForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="用户显示名" prop="userShowName">
          <el-input v-model="dialogForm.userShowName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="dialogForm.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPassword">
          <el-input v-model="dialogForm.userPassword" auto-complete="off" :disabled="!isAddUserFlag"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="dialogForm.userDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="confirmDialog">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="是否删除？" :visible.sync="isDelConfirmDialog" width="30%" center>
      <span>是否删除{{readyDelUserName}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="confirmDialog('del')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import UserApi from '~/app/services/userServices'
import * as _ from 'underscore'
export default {
  name: 'users',
  data() {
    return {
      users: [],
      dialogName: '',
      diaLoginVisible: false,
      isAddUserFlag: false,
      isDelConfirmDialog: false,
      readyDelUserName: '',
      dialogForm: {
        id: 0,
        userName: '',
        userShowName: '',
        userPassword: '',
        userDesc: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, message: '至少三个字符', trigger: 'blur' }
        ],
        userShowName: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
          { min: 3, message: '至少三个字符', trigger: 'blur' }
        ],
        userPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, message: '至少三个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      let getUserApi = await UserApi.getUsers()
      this.users = getUserApi.result
      _.each(this.users, userItem => {
        userItem.gmtCreate = this.$moment(userItem.gmtCreate).format(
          'YYYY-MM-DD hh:mm:ss'
        )
        userItem.gmtModified = this.$moment(userItem.gmtModified).format(
          'YYYY-MM-DD hh:mm:ss'
        )
      })
    },
    editUser(editUser) {
      this.dialogName = '编辑用户'
      this.isAddUserFlag = false
      this.dialogForm.userName = editUser.userName
      this.dialogForm.userShowName = editUser.userShowName
      this.dialogForm.id = editUser.id
      this.dialogForm.userPassword = editUser.userPassword
      this.diaLoginVisible = true
      this.dialogForm.userDesc = editUser.userDesc
    },
    deleteUser(delUser) {
      this.dialogName = '删除用户'
      this.isDelConfirmDialog = true
      this.readyDelUserName = delUser.userName
      this.dialogForm.id = delUser.id
    },
    openAddUserDialog() {
      this.dialogName = '添加用户'
      this.diaLoginVisible = true
      this.isAddUserFlag = true
      this.dialogForm.userName = ''
      this.dialogForm.userShowName = ''
      this.dialogForm.userPassword = ''
      this.dialogForm.userDesc = ''
    },
    closeDialog() {
      this.diaLoginVisible = false
      this.isAddUserFlag = false
      this.isDelConfirmDialog = false
    },
    confirmDialog(isDelStr) {
      if (typeof isDelStr === 'string' && isDelStr === 'del') {
        this.isDelConfirmDialog = false
        this.__delUserToServices()
        return
      }
      if (this.isAddUserFlag) {
        this.__addUserToServices()
      } else {
        this.__editUserToService()
      }
    },
    async __delUserToServices() {
      let delUserResp = await UserApi.delUser({ id: this.dialogForm.id })
      let { success, error } = delUserResp
      this.$message({
        message: success ? '删除用户成功' : error,
        type: success ? 'success' : 'warning'
      })
      this.getUserList()
      this.closeDialog()
    },
    __editUserToService() {
      this.$refs.ruleForm.validate(async values => {
        if (values) {
          let {
            userName,
            userShowName,
            userPassword,
            id,
            userDesc
          } = this.dialogForm
          let userUpdate = await UserApi.editUser({
            userName,
            userShowName,
            userPassword,
            id,
            userDesc
          })
          let { success, error } = userUpdate
          this.$message({
            message: success ? '编辑用户成功' : 'error',
            type: success ? 'success' : 'warning'
          })
          this.diaLoginVisible = false
          this.getUserList()
        }
      })
    },
    __addUserToServices() {
      this.$refs.ruleForm.validate(async values => {
        if (values) {
          let {
            userName,
            userShowName,
            userPassword,
            userDesc
          } = this.dialogForm
          let userAddResp = await UserApi.addUser({
            userName,
            userShowName,
            userPassword,
            userDesc
          })
          let { success, error } = userAddResp
          this.$message({
            message: success ? '添加用户成功' : error,
            type: success ? 'success' : 'warning'
          })
          this.diaLoginVisible = false
          this.getUserList()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.quick-container {
  .quick-card {
    .el-card__header {
      padding: 0 20px;
      height: 48px;
      line-height: 48px;
    }
    .el-step__description {
      margin-top: 15px;
      p {
        line-height: 1.5;
      }
    }
  }
}
.quick-container {
  .quick-card {
    margin: 0px 20px 20px 20px;
    .add-user__button {
      float: right;
      cursor: pointer;
    }
    .card-text {
      font-size: 13px;
      color: #999;
      line-height: 1.5;
    }
    .card-btn {
      margin-top: 15px;
    }
  }
}
</style>

