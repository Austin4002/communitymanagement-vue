<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>社团列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table :data="clubList" border>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="社团名称" prop="name"></el-table-column>
        <el-table-column label="社团简介" prop="description"></el-table-column>
        <el-table-column label="星级" prop="starLevel">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.starLevel" disabled></el-rate>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button type="info" size="mini" :enterable="false" @click="joinClub(scope.row.id)">加入社团</el-button>
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
import {clubList, studentJoinClub} from "@/network/club";

export default {
  name: "ClubList",
  data() {
    return {
      clubList: [],
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
    this.getClubList()
  },
  methods: {
    //监听pageSize改变的时间
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getClubList()
    },
    //监听翻页操作
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getClubList()
    },
    getClubList() {
      clubList(this.currentPage, this.pageSize).then(res => {
        if (res.code !== 200) {
          this.$message({
            showClose: true,
            message: '数据获取失败',
            type: 'error',
            center: true
          })
        } else if (res.code === 200) {
          this.clubList = res.data.records
          this.totalPage = res.data.pages
          this.totalCount = res.data.total
        }

      })
    },
    joinClub(clubId) {
      let stuNo = sessionStorage.getItem("no")
      studentJoinClub(stuNo, clubId).then(res => {
        if (res.code === 200) {
          this.$message.success("加入成功")
        } else if (res.code === 503) {
          this.$message.warning(res.msg)
        } else {
          this.$message.error("操作失败，请重试")
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
