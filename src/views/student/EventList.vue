<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table :data="eventList" border stripe>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="活动名称" prop="name"></el-table-column>
        <el-table-column label="活动地点" prop="place"></el-table-column>
        <el-table-column label="活动类型一" prop="type1"></el-table-column>
        <el-table-column label="活动类型二" prop="type2"></el-table-column>
        <el-table-column label="开始时间" prop="startTime"></el-table-column>

        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button type="info" size="mini" :enterable="false" @click="showEventInfo(scope.row.id)">进入签到</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-card>
  </div>
</template>

<script>

import {studentEventList} from "@/network/event";

export default {
  name: "EventList",
  data() {
    return {

      eventList: []
    }
  },
  created() {
    this.getEventList()
  },
  methods: {
    getEventList() {
      let stuNo = sessionStorage.getItem("no")
      studentEventList(stuNo).then(res => {
        if (res.code === 200) {
          this.eventList = res.data
        } else if (res.code === 503) {
          this.$message.error(res.msg)
        } else if (res.code === 504) {
          this.$message.error(res.msg)
        } else {
          this.$message.error("请求失败，请重试")
        }
      })
    },
    showEventInfo(eventId) {
      this.$router.push({path: '/home/student/personal/eventList/eventInfo', query: {id: eventId}})
    }
  }

}
</script>

<style scoped>

</style>
