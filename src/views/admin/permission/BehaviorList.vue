<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>行为日志</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="logList" border stripe>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="请求url" prop="url"></el-table-column>
        <el-table-column label="请求方法" prop="method"></el-table-column>
        <el-table-column label="请求参数" prop="params"></el-table-column>
        <el-table-column label="ip地址" prop="ip"></el-table-column>
        <el-table-column label="请求时间" prop="time"></el-table-column>

      </el-table>
      <!--分页-->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
      </el-pagination>
    </el-card>


  </div>
</template>

<script>
import {logList} from "@/network/log";

export default {
  name: "BehaviorList",
  data() {
    return {
      logList: [],
      //当前页码
      currentPage: 1,
      //每页显示条数
      pageSize: 10,
      //总条数
      totalCount: 0,
      //总页数
      totalPage: 0,
    }
  },
  created() {
    this.getLogList()
  },
  methods: {
    //监听pageSize改变的时间
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getLogList()
    },
    //监听翻页操作
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getLogList()
    },
    getLogList() {
      logList(this.currentPage, this.pageSize).then(res => {
        if (res.code === 200) {
          this.logList = res.data.records
          this.totalPage = res.data.pages
          this.totalCount = res.data.total
        } else {
          this.$message.error("数据获取失败")
        }
      })
    },

  }
}
</script>

<style scoped>

</style>
