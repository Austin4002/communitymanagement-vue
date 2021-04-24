<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="form" label-width="80px" label-position="left">
      <el-form-item label="学号">
        <el-input v-model="form.no"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-input v-model="form.clazz"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="updateUserInfo">修改信息</el-button>
      </el-form-item>
    </el-form>


  </div>
</template>

<script>
import {getUserInfo, updateUserInfo} from "@/network/user";

export default {
  name: "personalInfo",
  data() {
    return {
      form: {
        no:'',
        name:'',
        clazz:'',
        password:'',
        phone:''
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      let stuNo = window.sessionStorage.getItem("no")
      getUserInfo(stuNo).then(res => {
        if (res.code !== 200) {
          this.$message({
            showClose: true,
            message: '数据获取失败',
            type: 'error',
            center: true
          })
        } else if (res.code === 200) {
          // console.log(res.data);
          this.form.no = res.data.no
          this.form.name = res.data.name
          this.form.clazz = res.data.clazz
          this.form.password =res.data.password
          this.form.phone = res.data.phone
        }
      })
    },
    async updateUserInfo(){
      await updateUserInfo(this.form).then(res=>{
        if (res.code ===200){
          this.$message.success("更新成功")
        } else {
          this.$message.error("更新失败，请重试")
        }
      })
    }

  }
}
</script>

<style scoped>

</style>
