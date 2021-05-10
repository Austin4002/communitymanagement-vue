<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/home/proprieter/eventManagement/eventList'}">活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :model="eventForm" ref="editFormRef" label-width="150px" label-position="left">
        <el-form-item label="活动名称">
          <el-input v-model="eventForm.name"></el-input>
        </el-form-item>
        <el-form-item label="参与社团">
          <el-tag v-for="item in eventForm.clubList">{{ item.name }}</el-tag>
        </el-form-item>
        <el-form-item label="活动地点">
          <el-input v-model="eventForm.place"></el-input>
        </el-form-item>

        <el-form-item label="活动一级类型">
          <el-input v-model="eventForm.type1"></el-input>
        </el-form-item>
        <el-form-item label="活动二级类型">
          <el-input v-model="eventForm.type2"></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-input v-model="eventForm.startTime"></el-input>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-input v-model="eventForm.endTime"></el-input>
        </el-form-item>
        <el-form-item v-show="eventForm.status > 1">
          <el-button type="primary" @click="joinIn">我要加入</el-button>
          <el-button v-show="clubSize >= 3" type="danger" @click="apply">提交申请</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script>
import {changeEventStatus, getEventInfoById, proprieterJoinInEvent} from "@/network/event";

export default {
  name: "EventInfo",
  data() {
    return {
      eventForm: {
        place: '',
        type1: '',
        type2: '',
        startAndEndTime: []
      },
      clubSize:0
    }
  },
  created() {
    this.getEventById()
  },
  methods: {
    getEventById() {
      let eventId = this.$route.query.id;
      getEventInfoById(eventId).then(res => {
        if (res.code !== 200) {
          this.$message.error("数据获取失败，请重试")
        } else {
          this.eventForm = res.data
          this.clubSize = res.data.clubList.length
        }
      })
    },
    joinIn() {
      let stuNo = sessionStorage.getItem("no")
      let eventId = this.$route.query.id;
      proprieterJoinInEvent(stuNo, eventId).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.getEventById()
        } else if (res.code === 503) {
          this.$message.warning(res.msg)
        } else {
          this.$message.error("失败，请重试")
        }
      })
    },
    apply(){
      let eventId = this.$route.query.id;
      changeEventStatus(eventId, 2).then(res => {
        if (res.code === 200) {
          this.$message.success("操作成功")
          this.$router.push({path: '/home/proprieter/eventManagement/eventList'})
        } else {
          this.$message.error("失败，请重试")
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
