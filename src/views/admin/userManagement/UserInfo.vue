<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path:'/home/userManagement/list' }">用户列表</el-breadcrumb-item>
      <el-breadcrumb-item>详细信息</el-breadcrumb-item>
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

      <el-form-item label="角色">
        <el-tag v-for="item in form.role" :key="item.id" :type="item.type">{{ item.description }}</el-tag>
      </el-form-item>

      <el-form-item>
        <el-button type="danger" @click="showEditDialog">修改用户权限</el-button>
        <el-button type="info" @click="back">返回</el-button>
      </el-form-item>
    </el-form>


    <!--修改信息-->
    <el-dialog title="修改用户权限" :visible.sync="editDialogVisible">
      <el-transfer v-model="value" :data="this.roleListVo" style="text-align: left; display: inline-block"
                   :titles="['角色列表', '用户拥有的角色']"></el-transfer>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setUserRole">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {getUserInfo} from "@/network/user";
import {changeUserRole, getRoleById, roleList} from "@/network/permission";

export default {
  name: "UserInfo",
  created() {
    this.getUserInfo()
    this.getRoles()
  },
  data() {
    return {
      roleList: [],
      form: {
        no: '',
        name: '',
        clazz: '',
        role: []
      },
      editDialogVisible: false,
      value: [],
      roleListVo: []

    }
  },
  methods: {

    getUserInfo() {
      let stuNo = this.$route.query.no;
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
          this.form.role = res.data.role
          for (let i = 0; i < res.data.role.length; i++) {
            this.value.push(res.data.role[i].id)
          }
        }
      })
    },
    back() {
      history.back()
    },
    getRoles() {
      roleList(1, 10).then(res => {
        if (res.code !== 200) {
          this.$message({
            showClose: true,
            message: '数据获取失败',
            type: 'error',
            center: true
          })
        } else if (res.code === 200) {
          // console.log(res.data);
          this.roleList = res.data.records
          for (let i = 0; i < res.data.records.length; i++) {
            let key = res.data.records[i].id
            let label = res.data.records[i].description
            this.roleListVo.push({
              key: key,
              label: label
            })
          }
        }
      })

    },
    showEditDialog() {
      this.editDialogVisible = true;
    },
    setUserRole1() {
      let stuNo = this.$route.query.no;
      changeUserRole(stuNo, this.value).then(res => {

        if (res.code === 502) {
          this.$message.error('用户至少拥有一个角色');
        } else if (res.code === 200) {
          this.$message.success("修改成功")
          this.editDialogVisible = false

        }
      })
    },
    async setUserRole(){
      const confirmResult = await this.$confirm('确定要修改权限吗，此操作成功后需要重新登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if(confirmResult !== 'confirm'){
        return this.$message({
          type: 'info',
          message: '已取消删除'
        });
      }
      let stuNo = this.$route.query.no;
      await changeUserRole(stuNo, this.value).then(res => {
        if (res.code === 502) {
          this.$message.error('用户至少拥有一个角色');
        } else if (res.code === 200) {
          this.$message.success("修改成功")
          this.editDialogVisible = false
          this.logout()
        }
      })

    },
    logout(){
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
  }
}
</script>

<style scoped>

</style>
