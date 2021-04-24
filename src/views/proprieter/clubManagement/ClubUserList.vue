<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>社团管理</el-breadcrumb-item>
      <el-breadcrumb-item>社团成员</el-breadcrumb-item>
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
            <el-button type="info" size="mini" :enterable="false" @click="deleteUserFromClub(scope.row.no)">删除
            </el-button>
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

import {clubUserList, deleteUserFromClub} from "@/network/club";

export default {
  name: "ClubUserList",
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
    this.getClubUserList()
  },
  methods: {
    //监听pageSize改变的时间
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getClubUserList()
    },
    //监听翻页操作
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getClubUserList()
    },
    getClubUserList() {
      let proprieterNo = sessionStorage.getItem("no");
      clubUserList(this.currentPage, this.pageSize, proprieterNo).then(res => {
        if (res.code === 200) {
          this.userList = res.data.records
          this.totalCount = res.data.total
          this.totalPage = res.data.pages
        } else {
          this.$message.error("请求失败，请重试")
        }
      })
    },
    async deleteUserFromClub(no) {

      const confirmResult = await this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消删除'
        });
      }

      let proprieterNo = sessionStorage.getItem("no");
      await deleteUserFromClub(proprieterNo, no).then(res => {
        if (res.code === 200) {
          this.$message.success("删除成功")
          this.getClubUserList()
        }else {
          this.$message.error("删除失败")
        }
      })

    }
  }
}
</script>

<style scoped>

</style>
