<template>
  <div class="login_container">
    <div class="login_box">
      <h3>高校社团管理系统</h3>
      <el-form :model="form" :rules="rules" label-width="80px" :label-position="labelPosition" class="login_form">
        <el-form-item label="学号" prop="no">
          <el-input v-model="form.no"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item class="btns">
          <el-button type="primary" @click="userLogin">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import {login} from "@/network/user";

export default {
  name: "Login",
  data() {
    return {
      form: {
        no: '',
        password: ''
      },
      rules: {
        no: [
          {required: true, message: '请输入学号', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ]
      },
      labelPosition: 'left'
      }
    },
  methods:{
    userLogin(){
      login(this.form.no, this.form.password).then(res => {
        if (res.code != 200) {
          this.$message({
            showClose: true,
            message: '帐号或密码错误',
            type: 'error',
            center: true
          })
        } else {
          this.$message.success({
            message: "登录成功",
            showClose: true
          })
          // console.log(res.data);
          sessionStorage.setItem("no", res.data.no)
          sessionStorage.setItem("token", res.data.token)

          //讲role转换成json字符串
          let roleString = JSON.stringify(res.data.role)
          sessionStorage.setItem("role", roleString)
          //读取
          // JSON.parse(roleString)
          this.$router.push({path: "/home"})
        }
      }, error => {
        console.log(err);
      })
    }
  }

}
</script>
<style scoped>
.login_container {

  background-image: url("../assets/bgg.gif");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment:fixed;
  height: 100%;
  background-color: #2b4b6b;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #ffffff;
  /*background-color: #2b4b6b;*/
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  text-align: center;

}

.login_form{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns{
  display: flex;
  justify-content: flex-end;
}
</style>
