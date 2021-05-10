<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>社团管理</el-breadcrumb-item>
      <el-breadcrumb-item>社团评分规则设置</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-form label-width="150px" label-position="left">
        <el-form-item label="活动数量占比" >
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="签到率占比">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger">计算</el-button>
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ClubRateSet"
}
</script>

<style scoped>

</style>
