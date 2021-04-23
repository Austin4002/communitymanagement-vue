<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table :data="userList" border stripe>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="学号" prop="no"></el-table-column>
        <el-table-column label="联系电话" prop="phone"></el-table-column>
        <el-table-column label="性别" prop="sex"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">

            <el-button type="info" size="mini" :enterable="false" @click="showUserInfo(scope.row.no)">查看详情</el-button>

          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
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
  </div>
</template>

<script>

import {userList} from "@/network/user";

export default {
  name: "UserList",
  data() {
    return {
      userList: [],
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
    this.getUserList()
  },
  methods: {
    //监听pageSize改变的时间
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getUserList()
    },
    //监听翻页操作
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getUserList()
    },
    getUserList() {
      userList(this.currentPage, this.pageSize).then(res => {
        if (res.code !== 200) {
          this.$message({
            showClose: true,
            message: '数据获取失败',
            type: 'error',
            center: true
          })
        } else if (res.code === 200) {
          this.userList = res.data.records
          this.totalPage = res.data.pages
          this.totalCount = res.data.total
        }

      })
    },
    showUserInfo(stuNo) {
      this.$router.push({path: '/home/userManagement/list/userInfo', query: {no: stuNo}})
    }
  }
}
</script>

<style scoped>

</style>
