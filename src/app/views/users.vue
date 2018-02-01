<template>
    <div class="quick-container">
        <el-card class="quick-card">
            <div slot="header">
                <span>用户列表</span>
                <el-button size="mini" class="add-user__button" type="primary">用户添加</el-button>
            </div>
            <div class="card-text">
                <el-table :data="users" style="width: 100%" height="500" border stripe>
                    <el-table-column fixed="left" type="index" width="50">
                    </el-table-column>

                    <el-table-column fixed prop="id" label="用户表的ID" width="200">
                    </el-table-column>

                    <el-table-column prop="userShowName" label="用户显示名" width="200" sortable>
                    </el-table-column>

                    <el-table-column label="用户登录名" width="200" sortable>
                        <template slot-scope="scope">
                            <el-tag size="medium"> {{scope.row.userName}}</el-tag>
                        </template>
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
                            <el-button type="text" icon="el-icon-edit" @click="editUser(scope.row)" size="small">编辑
                            </el-button>
                            <el-button type="text" icon="el-icon-delete" @click="deleteUser(scope.row)" size="small">移除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>
<script>
import UserApi from '~/app/services/userServices'
export default {
  name: 'users',
  data() {
    return {
      users: []
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      let getUserApi = await UserApi.getUsers()
      this.users = getUserApi.result
    },
    editUser() {},
    deleteUser() {}
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

