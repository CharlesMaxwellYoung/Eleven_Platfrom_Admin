<template>
  <div class="quick-container">
    <el-card class="quick-card">
      <el-tabs v-model="activeName" @tab-click="changeTab">
        <el-tab-pane label="用户角色关系" name="userRoleLink">
          <el-form ref="form" :label-position="'left'" label-width="200px">
            <el-form-item label="当前用户名">
              <el-select v-model="value" placeholder="请选择" @change="handleSelect">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户所对应的角色">
              <el-transfer v-model="transferRightList" filterable filter-placeholder="请输入角色" :titles="['所有角色', '用户拥有的角色']" :button-texts="['到左边', '到右边']" :format="transferFormat" @change="handleChange" :data="transferLeftList">
                <el-button class="transfer-footer" slot="left-footer" size="small">取消</el-button>
                <el-button class="transfer-footer" slot="right-footer" size="small" @click="saveRoles">保存
                </el-button>
              </el-transfer>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="角色权限关系" name="rolePermLink">
          <el-form ref="form" :label-position="'left'" label-width="200px">
            <el-form-item label="当前角色">
              <el-select v-model="roleValue" placeholder="请选择" @change="handleSelectForPermission">
                <el-option v-for="item in roleList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="角色拥有的权限">
              <el-transfer v-model="transferPermissionRightList" filterable filter-placeholder="请输入权限" :titles="['所有权限', '角色拥有的权限']" :button-texts="['到左边', '到右边']" :format="transferFormat" @change="handleChange" :data="transferPermissionLeftList">
                <el-button class="transfer-footer" slot="left-footer" size="small">取消</el-button>
                <el-button class="transfer-footer" slot="right-footer" size="small" @click="savePermissionLink">保存
                </el-button>
              </el-transfer>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import UserApi from '~/app/services/userServices'
import * as _ from 'underscore'
export default {
  name: 'rabc',
  data() {
    return {
      activeName: 'userRoleLink',
      options: [],
      cacheRoles: [],
      cacheUserId: 0,
      cacheUsers: [],
      value: '',
      roleValue: '',
      roleList: [],
      transferLeftList: [],
      transferRightList: [],
      transferPermissionLeftList: [],
      transferPermissionRightList: [],
      transferFormat: {
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }
    }
  },
  created() {
    this.getUser()
    this.getRole()
    this.getPermission()
  },
  methods: {
    async getUser() {
      let userResult = await UserApi.getUsers()
      let { result } = userResult
      this.cacheUsers = result
      this.options = _.map(result, user => {
        return {
          value: user.id,
          label: user.userName
        }
      })
      this.value = this.options[0].value
      this.getRoleNameByUserName(this.options[0].label)
    },
    async getRole() {
      let roleResult = await UserApi.getRoles()
      let { result } = roleResult
      this.cacheRoles = result
      this.transferLeftList = _.map(result, (item, index) => {
        return {
          key: item.id,
          label: `${index + 1} ${item.roleName}`,
          disabled: false
        }
      })
      this.roleList = _.map(result, role => {
        return {
          value: role.id,
          label: role.roleName
        }
      })
    },
    async getPermission() {
      let permResult = await UserApi.getPerm()
      let { result } = permResult
      this.transferPermissionLeftList = _.map(result, (item, index) => {
        return {
          key: item.id,
          label: `${index + 1} ${item.permissionName}`,
          disabled: false
        }
      })
    },
    async getRoleNameByUserName(userName) {
      let roleNameResult = await UserApi.getRoleNameByUserName(userName)
      let { result } = roleNameResult
      let userRole = _.find(
        this.cacheRoles,
        roleItem => roleItem.roleName === result[0]
      )
      if (userRole && userRole.id) {
        this.transferRightList = [userRole.id]
      } else {
        this.transferRightList = []
      }
    },

    async getPermissionByRoleId(roleId) {
      let permissionResult = await UserApi.getPermissionByRoleId(roleId)
      let { result } = permissionResult
      this.transferPermissionRightList = result
    },
    changeTab(tab) {
      let { name } = tab
      if (name === 'userRoleLink') {
        this.value = this.options[0].value
        this.getRoleNameByUserName(this.options[0].label)
      } else {
        this.roleValue = this.roleList[0].value
        this.getPermissionByRoleId(this.roleList[0].value)
      }
    },
    handleSelect(userId) {
      let selectUser = _.find(
        this.cacheUsers,
        cacheUser => cacheUser.id === userId
      )
      this.cacheUserId = selectUser.id
      this.getRoleNameByUserName(selectUser.userName)
    },
    handleSelectForPermission(roleId) {
      this.getPermissionByRoleId(roleId)
    },
    handleChange() {},
    async saveRoles() {
      let roleId = _.compact(this.transferRightList)
      if (roleId.length > 1) {
        this.$message({
          showClose: true,
          message: '每个用户只能对应一个角色',
          type: 'error'
        })
        return
      }
      let editUserService = await UserApi.editUser({
        id: this.cacheUserId,
        roleId: roleId[0]
      })
      if (editUserService) {
        this.$message({
          showClose: true,
          message: '添加角色成功',
          type: 'success'
        })
      } else {
        this.$message({
          showClose: true,
          message: '添加角色成功',
          type: 'error'
        })
      }
    },
    async savePermissionLink() {
      let permissionIds = this.transferPermissionRightList
      let roleId = this.roleValue
      let saveRabcStatus = await UserApi.setRabcLink({
        roleId,
        permissionIds
      })
      if (saveRabcStatus) {
        this.$message({
          showClose: true,
          message: '添加权限成功',
          type: 'success'
        })
      } else {
        this.$message({
          showClose: true,
          message: '添加权限成功',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.quick-container {
  .quick-card {
    margin: 0px 20px 20px 20px;
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
.transfer-footer {
  margin-left: 20px;
  padding: 6px 5px;
}
</style>


