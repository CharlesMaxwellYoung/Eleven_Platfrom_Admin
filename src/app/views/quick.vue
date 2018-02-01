<template>
  <div class="quick-container">
    <el-row>
      <el-col :span="8">
        <el-card class="quick-card">
          <div slot="header" class="clearfix">
            <img src="../../assets/logo.png" class="image">
            <span class="user-name-title">{{userName}}</span>
            <span class="user-role-title">{{userName}}</span>
          </div>
          <div>
            <span class="sysdate-time">登录时间:</span>
            <span class="sysdate-content">{{sysDate}}</span>
          </div>
          <div>
            <span class="sysdate-time">登录Ip:</span>
            <span class="sysdate-content">{{systemIp}}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row>
          <el-col :span="8">
            <el-card class="quick-card">
              <div class="user-card">
                <i class="material-icons">
                  person</i>
                <div class="user-card-content">
                  <p class="user-counts">
                    {{userCounts}}
                  </p>
                  <p class="user-count-title">
                    用户个数
                  </p>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="quick-card">
              <div class="role-card">
                <i class="material-icons">
                  perm_contact_calendar</i>
                <div class="role-card-content">
                  <p class="role-counts">
                    {{roleCouns}}
                  </p>
                  <p class="role-count-title">
                    角色个数
                  </p>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="quick-card">
              <div class="perms-card">
                <i class="material-icons">
                  lock</i>
                <div class="perms-card-content">
                  <p class="perms-counts">
                    {{permissionCounts}}
                  </p>
                  <p class="perms-count-title">
                    权限个数
                  </p>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UserApi from '~/app/services/loginServices'
import Session from '~/app/services/sessionServices'
export default {
  data() {
    return {
      userCounts: 0,
      roleCouns: 0,
      permissionCounts: 0,
      userName: '',
      sysDate: '',
      systemIp: ''
    }
  },
  methods: {
    async getUserInfo() {
      let userNormalInfo = await UserApi.getNormalInfo()
      if (userNormalInfo.success) {
        let {
          result: { sysDate, userRolePermsCounts, ipAddress }
        } = userNormalInfo

        this.userCounts = userRolePermsCounts[0]
        this.roleCouns = userRolePermsCounts[1]
        this.permissionCounts = userRolePermsCounts[2]
        this.systemIp = ipAddress
        this.sysDate = sysDate
      }
    },
    refreshTime(sysDate) {}
  },
  created() {
    this.getUserInfo()
    this.userName = Session.get('userName')
  }
}
</script>
<style scoped lang="scss" >
.quick-container {
  .quick-card {
    margin: 0px 10px 10px 10px;
    .image {
      width: 96px;
      height: 96px;
      vertical-align: middle;
    }
    .user-name-title {
      font-size: 2em;
      color: #2d8cf0;
      font-weight: 900;
    }
    .user-role-title {
      font-size: 12px;
      color: #c8c8c8;
      text-align: center;
    }
    .sysdate-time {
      font-weight: 500;
      color: #c8c8c8;
    }
    .sysdate-content {
      float: right;
    }
    .user-card {
      position: relative;
      .material-icons {
        font-size: 66px;
        color: #409eff;
      }
      .user-card-content {
        display: inline-block;
        position: absolute;
        top: 0;
        .user-counts {
          margin: 0;
          font-size: 30px;
          color: #409eff;
          width: 100%;
          text-align: center;
          font-weight: 900;
        }
        .user-count-title {
          margin: 0;
          font-size: 12px;
          font-weight: 500;
          color: #c8c8c8;
        }
      }
    }
    .role-card {
      position: relative;
      .material-icons {
        font-size: 66px;
        color: #67c23a;
      }
      .role-card-content {
        display: inline-block;
        position: absolute;
        top: 0;
        .role-counts {
          margin: 0;
          font-size: 30px;
          color: #67c23a;
          width: 100%;
          text-align: center;
          font-weight: 900;
        }
        .role-count-title {
          margin: 0;
          font-size: 12px;
          font-weight: 500;
          color: #c8c8c8;
        }
      }
    }
    .perms-card {
      position: relative;
      .material-icons {
        font-size: 66px;
        color: #e6a23c;
      }
      .perms-card-content {
        display: inline-block;
        position: absolute;
        top: 0;
        .perms-counts {
          margin: 0;
          font-size: 30px;
          color: #e6a23c;
          width: 100%;
          text-align: center;
          font-weight: 900;
        }
        .perms-count-title {
          margin: 0;
          font-size: 12px;
          font-weight: 500;
          color: #c8c8c8;
        }
      }
    }
    .github-star {
      float: right;
      color: #108ee9;
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
