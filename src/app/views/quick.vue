<style lang="scss">
.quick-container {
  .quick-card {
    .el-card__header {
      padding: 0 20px;
      height: 48px;
      line-height: 48px;
      text-align: center;
    }
    .el-step__description {
      margin-top: 15px;
      p {
        line-height: 1.5;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.quick-container {
  .quick-user--count {
    width: 100px;
  }
  .quick-card-user {
    color: white;
    background-color: rgb(45, 140, 240);
  }
  .quick-card {
    margin: 0px 10px 10px 10px;
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
<template>
  <div class="quick-container">
    <el-row>
      <el-col :span="8">
        <el-card class="quick-card">
          <div slot="header" class="clearfix">
            <span>用户姓名</span>
          </div>
          <div>
            {{'列表内容 '}}
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row>
          <el-col :span="8">
            <el-card class="quick-card quick-card-user">
              <div slot="header" class="clearfix header-user">
                <span>
                  <i class="material-icons md-48">
                    person</i>
                </span>
              </div>
              <div>
                {{'列表内容 '}}
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="quick-card">
              <div slot="header" class="clearfix">
                <span>
                  <i class="material-icons md-48">
                    person</i>
                </span>
              </div>
              <div>
                {{'列表内容 '}}
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="quick-card">
              <div slot="header" class="clearfix">
                <span>用户姓名</span>
              </div>
              <div>
                {{'列表内容 '}}
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 1
    }
  },
  methods: {
    prev() {
      // 上一步
      const that = this
      if (that.active-- < 2) that.active = 1
    },
    next() {
      // 下一步
      const that = this
      if (that.active++ > 2) that.active = 3
    },
    finish() {
      // 完成
      const that = this
      that.active = 1
      that.$message.success('恭喜您，大牛！')
    }
  }
}
</script>
