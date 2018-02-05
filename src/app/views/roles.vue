<template>
    <div class="quick-container">
        <el-card class="quick-card">
            <div slot="header">
                <span>角色列表</span>
                <el-button size="mini" class="add-user__button" type="primary" @click="openAddRoleDialog()">角色添加</el-button>
            </div>
            <div class="card-text">
                <el-table :data="roles" style="width: 100%" height="500" border stripe>
                    <el-table-column fixed="left" type="index" width="50">
                    </el-table-column>

                    <el-table-column fixed prop="id" label="角色表的ID" width="80">
                    </el-table-column>

                    <el-table-column prop="roleName" label="角色名" width="200" sortable>
                    </el-table-column>

                    <el-table-column prop="roleDesc" label="描述" sortable>
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
                <el-form-item label="角色名" prop="roleName">
                    <el-input v-model="dialogForm.roleName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" v-model="dialogForm.roleDesc"></el-input>
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
import RoleApi from '~/app/services/userServices'
export default {
  name: 'roles',
  data() {
    return {
      roles: [],
      dialogName: '',
      diaLoginVisible: false,
      isAddRoleFlag: false,
      isDelConfirmDialog: false,
      readyDelUserName: '',
      dialogForm: {
        id: 0,
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名', trigger: 'blur' },
          { min: 3, message: '至少三个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getRoles()
  },
  methods: {
    openAddRoleDialog() {
      this.dialogName = '添加角色'
      this.diaLoginVisible = true
      this.isAddRoleFlag = true
      this.dialogForm.roleName = ''
      this.dialogForm.roleDesc = ''
    },
    editUser(editRole) {
      this.dialogName = '编辑用户'
      this.isAddRoleFlag = false
      this.diaLoginVisible = true
      this.dialogForm.roleName = editRole.roleName
      this.dialogForm.roleDesc = editRole.roleDesc
      this.dialogForm.id = editRole.id
    },
    deleteUser(editRole) {
      this.dialogName = '删除用户'
      this.isDelConfirmDialog = true
      this.readyDelUserName = editRole.userName
      this.dialogForm.id = editRole.id
    },
    closeDialog() {
      this.diaLoginVisible = false
      this.isAddRoleFlag = false
      this.isDelConfirmDialog = false
    },
    confirmDialog(isDelStr) {
      if (typeof isDelStr === 'string' && isDelStr === 'del') {
        this.isDelConfirmDialog = false
        this.__delRoleToServices()
        return
      }
      if (this.isAddRoleFlag) {
        this.__addRoleToServices()
      } else {
        this.__editRoleToService()
      }
    },
    async __delRoleToServices() {
      let delUserResp = await RoleApi.delRole({ id: this.dialogForm.id })
      let { success, error } = delUserResp
      this.$message({
        message: success ? '删除用户成功' : error,
        type: success ? 'success' : 'warning'
      })
      this.getRoles()
      this.closeDialog()
    },
    __editRoleToService() {
      this.$refs.ruleForm.validate(async values => {
        if (values) {
          let { roleName, roleDesc, id } = this.dialogForm
          let RoleUpdate = await RoleApi.editRole({
            roleName,
            roleDesc,
            id
          })
          let { success, error } = RoleUpdate
          this.$message({
            message: success ? '编辑用户成功' : 'error',
            type: success ? 'success' : 'warning'
          })
          this.diaLoginVisible = false
          this.getRoles()
        }
      })
    },
    __addRoleToServices() {
      this.$refs.ruleForm.validate(async values => {
        if (values) {
          let { roleName, roleDesc } = this.dialogForm
          let roleAddResp = await RoleApi.addRole({
            roleName,
            roleDesc
          })
          let { success, error } = roleAddResp
          this.$message({
            message: success ? '添加角色成功' : error,
            type: success ? 'success' : 'warning'
          })
          this.diaLoginVisible = false
          this.getRoles()
        }
      })
    },
    async getRoles() {
      let getRoleApi = await RoleApi.getRoles()
      this.roles = getRoleApi.result
      _.each(this.roles, roleItem => {
        roleItem.gmtCreate = this.$moment(roleItem.gmtCreate).format(
          'YYYY-MM-DD hh:mm:ss'
        )
        roleItem.gmtModified = this.$moment(roleItem.gmtModified).format(
          'YYYY-MM-DD hh:mm:ss'
        )
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


