<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path:'/home/userManagement/club' }">社团列表</el-breadcrumb-item>
      <el-breadcrumb-item>详细信息</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="form" label-width="80px" label-position="left">
      <el-form-item label="社团名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="社团简介">
        <el-input
            type="textarea"
            maxlength="120"
            show-word-limit
            :rows="2"
            placeholder="请输入内容"
            v-model="form.description">
        </el-input>
      </el-form-item>
      <el-form-item label="社长姓名">
        <el-input v-model="form.proprieterName"></el-input>
      </el-form-item>

      <el-form-item label="社长学号">
        <el-input v-model="form.proprieterNo"></el-input>
      </el-form-item>
      <el-form-item label="成员名单">
        <el-card>

          <el-table :data="clubUserList" stripe border>
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="学号" prop="no"></el-table-column>
            <el-table-column label="联系电话" prop="phone"></el-table-column>
            <el-table-column label="性别" prop="sex"></el-table-column>
          </el-table>

          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[2, 3, 5]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount">
          </el-pagination>
        </el-card>
      </el-form-item>
      <el-form-item label="星级">
        <el-rate v-model="form.starLevel" disabled></el-rate>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editClub">提交修改</el-button>
        <el-button type="primary" @click="back">返回</el-button>
      </el-form-item>
    </el-form>


  </div>

</template>

<script>
import {getClubById, getClubUserList, updateClubById} from "@/network/club";

export default {
  name: "ClubInfo",
  data() {
    return {
      form: {
        id: '',
        name: '',
        description: '',
        starLevel: 0,
        proprieterName:'',
        proprieterNo:''

      },
      clubUserList: [],
      //当前页码
      currentPage: 1,
      //每页显示条数
      pageSize: 5,
      //总条数
      totalCount: 0,
      //总页数
      totalPage: 0,
    }
  },
  created() {
    this.getClubInfo()
    this.getClubUser()
  },
  methods: {
    //监听pageSize改变的时间
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getClubUser()
    },
    //监听翻页操作
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getClubUser()
    },
    editClub() {
      let clubId = this.$route.query.id;
      updateClubById(this.form).then(res => {
        if (res.code === 200) {
          this.$message.success("更新成功")
          this.getClubInfo()
        } else {
          this.$message.error("失败，请重试")
        }
      })
    },
    getClubInfo() {
      let clubId = this.$route.query.id;
      getClubById(clubId).then(res => {
        if (res.code !== 200) {
          this.$message({
            showClose: true,
            message: '数据查询失败',
            type: 'error',
            center: true
          })
        } else if (res.code === 200) {
          this.form = res.data
        }
      }, error => {
        console.log(error);
      })


    },
    getClubUser() {
      let clubId = this.$route.query.id;
      getClubUserList(clubId, this.currentPage, this.pageSize).then(res => {
        if (res.code === 200) {
          this.clubUserList = res.data.records
          this.totalCount = res.data.total
          this.totalPage = res.data.pages
        } else {
          this.$message.error("数据请求错误")
        }
      })
    },
    back() {
      history.back()
    }
  }
}
</script>

<style scoped>
.el-rate {
  padding-top: 10px;
}
</style>
