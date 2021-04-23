<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path:'/home/eventManagement/approve'}">活动审批</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>



  </div>
</template>

<script>
export default {
  name: "EventInfo",
  data(){
    return{

    }
  },
  methods:{

  }
}
</script>

<style scoped>

</style>
