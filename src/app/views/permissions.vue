<template>
  <div class="quick-container">
    <el-card class="quick-card">
      <div slot="header">
        <span>权限列表</span>
        <el-button size="mini" class="add-user__button" type="primary" @click="openAddRoleDialog()">权限添加</el-button>
      </div>
      <div class="card-text">
        <el-table :data="perms" style="width: 100%" height="500" border stripe>
          <el-table-column fixed="left" type="index" width="50">
          </el-table-column>

          <el-table-column fixed prop="id" label="权限表的ID" width="80">
          </el-table-column>

          <el-table-column prop="permissionName" label="权限名" width="200" sortable>
          </el-table-column>

          <el-table-column prop="permissionDesc" label="描述" sortable>
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
        <el-form-item label="权限名" prop="permissionName">
          <el-input v-model="dialogForm.permissionName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input type="textarea" v-model="dialogForm.permissionDesc"></el-input>
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
import PermApi from '~/app/services/userServices'
import * as _ from 'underscore'
export default {
  name: 'permission',
  data() {
    return {
      perms: [],
      dialogName: '',
      diaLoginVisible: false,
      isAddRoleFlag: false,
      isDelConfirmDialog: false,
      readyDelUserName: '',
      dialogForm: {
        id: 0,
        permissionName: '',
        permissionDesc: ''
      },
      rules: {
        permissionName: [
          { required: true, message: '请输入角色名', trigger: 'blur' },
          { min: 3, message: '至少三个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getPermission()
  },
  methods: {
    openAddRoleDialog() {
      this.dialogName = '添加权限'
      this.diaLoginVisible = true
      this.isAddRoleFlag = true
      this.dialogForm.permissionName = ''
      this.dialogForm.permissionDesc = ''
    },
    editUser(editRole) {
      this.dialogName = '编辑权限'
      this.isAddRoleFlag = false
      this.diaLoginVisible = true
      this.dialogForm.permissionName = editRole.permissionName
      this.dialogForm.permissionDesc = editRole.permissionDesc
      this.dialogForm.id = editRole.id
    },
    deleteUser(editRole) {
      this.dialogName = '删除权限'
      this.isDelConfirmDialog = true
      this.readyDelUserName = editRole.permissionName
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
      let delUserResp = await PermApi.delPerm({ id: this.dialogForm.id })
      let { success, error } = delUserResp
      this.$message({
        message: success ? '删除权限成功' : error,
        type: success ? 'success' : 'warning'
      })
      this.getPermission()
      this.closeDialog()
    },
    __editRoleToService() {
      this.$refs.ruleForm.validate(async values => {
        if (values) {
          let { permissionName, permissionDesc, id } = this.dialogForm
          let RoleUpdate = await PermApi.editPerm({
            permissionName,
            permissionDesc,
            id
          })
          let { success, error } = RoleUpdate
          this.$message({
            message: success ? '编辑权限成功' : 'error',
            type: success ? 'success' : 'warning'
          })
          this.diaLoginVisible = false
          this.getPermission()
        }
      })
    },
    __addRoleToServices() {
      this.$refs.ruleForm.validate(async values => {
        if (values) {
          let { permissionName, permissionDesc } = this.dialogForm
          let roleAddResp = await PermApi.addPerm({
            permissionName,
            permissionDesc
          })
          let { success, error } = roleAddResp
          this.$message({
            message: success ? '添加权限成功' : error,
            type: success ? 'success' : 'warning'
          })
          this.diaLoginVisible = false
          this.getPermission()
        }
      })
    },
    async getPermission() {
      let getRoleApi = await PermApi.getPerm()
      this.perms = getRoleApi.result
      _.each(this.perms, roleItem => {
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


