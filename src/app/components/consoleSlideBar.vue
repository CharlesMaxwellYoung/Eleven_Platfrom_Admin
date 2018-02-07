<template>
  <div class="console-sidebar">
    <el-menu :unique-opened='true' :router='true' :default-active="defaultActive" class="sidebar-content">
      <div class="sidebar-fold">V1.0.0</div>
      <el-menu-item index="/quick">
        <i class="material-icons">home</i>平台状态</el-menu-item>
      <el-submenu index="base">
        <template slot="title">
          <i class="material-icons">lock</i>用户权限模块
        </template>
        <el-menu-item index="/users">
          <i class="material-icons">person</i>用户管理</el-menu-item>
        <el-menu-item index="/roles">
          <i class="material-icons">perm_contact_calendar</i>角色管理</el-menu-item>
        <el-menu-item index="/perms">
          <i class="material-icons">lock</i>权限管理</el-menu-item>
        <el-menu-item index="/rabc">
          <i class="material-icons">link</i>权限对应关系</el-menu-item>
      </el-submenu>
      <el-submenu index="user">
        <template slot="title">
          <i class="el-icon-message"></i>
          用户中心
        </template>
        <el-menu-item index="/user">
          <i class="el-icon-document"></i>用户管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  computed: {
    defaultActive: function() {
      const that = this
      return (
        (that.$route.meta && that.$route.meta.activePath) || this.$route.path
      )
    }
  }
}
</script>

<style lang="scss">
.console-sidebar {
  .el-submenu__title {
    font-size: 12px;
    height: 46px;
    line-height: 46px;
    color: #409eff;
  }
  .el-submenu {
    background: #37424f;
    border-bottom: 1px solid #414d5c;
  }
  .el-submenu__icon-arrow {
    right: 40px;
    margin-top: -4px;
  }
  .el-icon-message {
    font-size: 12px;
  }
  .el-menu-item {
    font-size: 12px;
    height: 42px;
    line-height: 42px;
    color: #409eff;
    background-color: #f2f6fc;
    &.is-active {
      border-right: none;
      color: #fff;
      background: #409eff !important;
      &:hover {
        background: #0099cc !important;
      }
    }
  }
}
</style>
<style scoped lang="scss">
.material-icons {
  font-size: 14px;
  margin-right: 15px;
}
.console-sidebar {
  position: fixed;
  top: 50px;
  bottom: 0px;
  background-color: #293038;
  z-index: 102;
  overflow-x: hidden;
  overflow-y: auto;
  height: auto;
  width: 180px;
  .sidebar-content {
    width: 200px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background: #293038;
    .sidebar-fold {
      height: 30px;
      width: 140px;
      background: #394555;
      color: #aeb9c2;
      text-align: left;
      padding: 0 20px;
      line-height: 30px !important;
      user-select: none;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
    }
  }
}
</style>
