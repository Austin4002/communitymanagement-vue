<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>经费管理</el-breadcrumb-item>
      <el-breadcrumb-item>出账管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table :data="financeList" border stripe>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="社团" prop="name"></el-table-column>
        <el-table-column label="金额" prop="money"></el-table-column>
        <el-table-column label="用途" prop="purpose"></el-table-column>
        <el-table-column label="审核状态" prop="status">
          <template slot-scope="scope">
            <el-tag effect="dark"
                    :type="scope.row.status == 0 ?'danger':(scope.row.status==1?'success':(scope.row.status==2?'info':''))">
              {{ scope.row.status == 0 ? '未通过' : (scope.row.status == 1 ? '已通过' : (scope.row.status == 2 ? '待审核' : '')) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status!==1" size="mini" :enterable="false" @click="approved(scope.row.id)">通过</el-button>
            <el-button type="danger" v-if="scope.row.status!==1" size="mini" :enterable="false" @click="refuse(scope.row.id)">拒绝</el-button>
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
import {changeFinanceStatus, financeList} from "@/network/finance";

export default {
  name: "Out",
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
  methods:{
    //监听pageSize改变的时间
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getEventList()
    },
    //监听翻页操作
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getEventList()
    },
    getFinanceList(){
      financeList(this.currentPage,this.pageSize).then(res => {
        if (res.code === 200) {
          this.financeList = res.data.records
          this.totalPage = res.data.pages
          this.totalCount = res.data.total
        } else {
          this.$message.error("请求失败，请重试")
        }
      })
    },
    approved(financeId){
      changeFinanceStatus(financeId,1).then(res=>{
        if (res.code === 200){
          this.$message.success("操作成功")
          this.getFinanceList()
        }else {
          this.$message.error("操作失败，请重试")
        }
      })
    },
    refuse(financeId){
      changeFinanceStatus(financeId,2).then(res=>{
        if (res.code === 200){
          this.$message.success("操作成功")
          this.getFinanceList()
        }else {
          this.$message.error("操作失败，请重试")
        }
      })
    }

  }
}
</script>

<style scoped>

</style>
