<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path:'/home/userManagement/list' }">用户列表</el-breadcrumb-item>
      <el-breadcrumb-item>详细信息</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="form"  label-width="80px" label-position="left">
      <el-form-item label="学号">
        <el-input v-model="form.no" disabled></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-input v-model="form.clazz" disabled></el-input>
      </el-form-item>

      <el-form-item label="角色">
        <el-checkbox-group v-model="form.role" :min="1">


          <el-checkbox label="管理员" name="description"></el-checkbox>
          <el-checkbox label="社长" name="description"></el-checkbox>
          <el-checkbox label="副社长" name="description"></el-checkbox>
          <el-checkbox label="学生" name="description"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item>
<!--        <el-button type="warning" @click="changeRole">修改角色</el-button>-->
        <el-button type="primary" @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getUserInfo} from "@/network/user";

export default {
  name: "UserInfo",
  created() {
    this.getUserInfo()
  },
  data() {
    return {
      form:{
        no:'',
        name:'',
        clazz:'',
        role:[]
      }
    }
  },
  methods: {
    getUserInfo(){
      let stuNo = this.$route.query.no;
      getUserInfo(stuNo).then(res =>{
        if (res.code !== 200) {
          this.$message({
            showClose: true,
            message: '数据获取失败',
            type: 'error',
            center: true
          })
        } else if ( res.code === 200){
          console.log(res.data);
          this.form.no = res.data.no
          this.form.name = res.data.name
          this.form.clazz = res.data.clazz
          let role = res.data.role
          for(let i = 0;i<role.length;i++){
            this.form.role.push(role[i].description)
          }

        }
      })
    },
    back(){
      history.back()
    }
  }
}
</script>

<style scoped>

</style>
