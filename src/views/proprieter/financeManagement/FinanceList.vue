<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>经费管理</el-breadcrumb-item>
      <el-breadcrumb-item>经费记录</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table :data="financeList" border stripe>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="金额" prop="money"></el-table-column>
        <el-table-column label="用途" prop="purpose"></el-table-column>
        <el-table-column label="审核状态" prop="status">
          <template slot-scope="scope">
            <el-tag effect="dark"
                    :type="scope.row.status == 0 ?'danger':(scope.row.status==1?'success':(scope.row.status==2?'info':''))">
              {{
                scope.row.status == 0 ? '未通过' : (scope.row.status == 1 ? '已通过' : (scope.row.status == 2 ? '待审核' : ''))
              }}
            </el-tag>
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
import {proprieterGetFinanceList} from "@/network/finance";

export default {
  name: "FinanceList",
  data() {
    return {
      //当前页码
      currentPage: 1,
      //每页显示条数
      pageSize: 5,
      //总条数
      totalCount: 0,
      //总页数
      totalPage: 0,
      financeList: []
    }
  },
  created() {
    this.getFinanceList()
  },
  methods: {
    //监听pageSize改变的时间
    handleSizeChange(newSize){
      this.pageSize = newSize
      this.getClubList()
    },
    //监听翻页操作
    handleCurrentChange(newPage){
      this.currentPage = newPage
      this.getClubList()
    },
    getFinanceList() {
      let stuNo = sessionStorage.getItem("no")
      proprieterGetFinanceList(stuNo,this.currentPage,this.pageSize).then(res=>{
        if (res.code ===200){
          this.financeList = res.data.records
          this.totalPage = res.data.pages
          this.totalCount = res.data.total
        }else{
          this.$message.error("查询失败,请重试")
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
