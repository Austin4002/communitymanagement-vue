<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动审批</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="eventList" border stripe>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="活动名称" prop="name"></el-table-column>
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
            <el-button type="info" size="mini" :enterable="false" @click="showEventInfo(scope.row.id)">查看详情</el-button>
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
import {eventList} from "@/network/event";

export default {
  name: "EventApprove",
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
      eventList: []
    }
  },
  created() {
    this.getEventList()
  },
  methods: {
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
    getEventList() {
      eventList(this.currentPage, this.pageSize).then(res => {
        if (res.code === 200) {
          this.eventList = res.data.records
        } else {
          this.$message.error("请求失败，请重试")
        }
      })
    },
    showEventInfo(eventId){
      this.$router.push({path: '/home/eventManagement/approve/eventInfo', query: {id: eventId}})
    }
  }
}
</script>

<style scoped>

</style>
